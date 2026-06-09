// craco.config.js
const path = require("path");
require("dotenv").config();

// Environment variable overrides
const config = {
  enableHealthCheck: process.env.ENABLE_HEALTH_CHECK === "true",
};

// Conditionally load health check modules only if enabled
let WebpackHealthPlugin;
let setupHealthEndpoints;
let healthPluginInstance;

if (config.enableHealthCheck) {
  WebpackHealthPlugin = require("./plugins/health-check/webpack-health-plugin");
  setupHealthEndpoints = require("./plugins/health-check/health-endpoints");
  healthPluginInstance = new WebpackHealthPlugin();
}

let webpackConfig = {
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {

      // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
        ],
      };

      // Add health check plugin to webpack if enabled
      if (config.enableHealthCheck && healthPluginInstance) {
        webpackConfig.plugins.push(healthPluginInstance);
      }

      // JS-only project: remove ForkTsCheckerWebpackPlugin (ajv conflict on Node 22)
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) => plugin?.constructor?.name !== 'ForkTsCheckerWebpackPlugin'
      );

      // Avoid source-map-loader ENOENT errors for hoisted nested deps (e.g. prop-types/react-is)
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.enforce === 'pre') {
          const uses = rule.use
            ? Array.isArray(rule.use)
              ? rule.use
              : [rule.use]
            : rule.loader
              ? [{ loader: rule.loader }]
              : [];
          if (
            uses.some(
              (u) =>
                u &&
                (u.loader === 'source-map-loader' ||
                  (typeof u.loader === 'string' && u.loader.includes('source-map-loader')))
            )
          ) {
            rule.exclude = /node_modules/;
          }
        }
      });

      return webpackConfig;
    },
  },
};

webpackConfig.devServer = (devServerConfig) => {
  // Add health check endpoints if enabled
  if (config.enableHealthCheck && setupHealthEndpoints && healthPluginInstance) {
    const originalSetupMiddlewares = devServerConfig.setupMiddlewares;

    devServerConfig.setupMiddlewares = (middlewares, devServer) => {
      // Call original setup if exists
      if (originalSetupMiddlewares) {
        middlewares = originalSetupMiddlewares(middlewares, devServer);
      }

      // Setup health endpoints
      setupHealthEndpoints(devServer, healthPluginInstance);

      return middlewares;
    };
  }

  return devServerConfig;
};

module.exports = webpackConfig;
