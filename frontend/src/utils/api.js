import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const REQUEST_TIMEOUT_MS = 30000;
const RETRY_DELAY_MS = 3000;

const client = axios.create({
  baseURL: API,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableGetError = (error) => {
  if (!error.response) return true;
  const status = error.response.status;
  return status >= 500 || status === 408 || status === 429;
};

/**
 * GET with one retry after 3s for cold-start / transient failures.
 */
const getWithRetry = async (url, config = {}) => {
  try {
    const { data } = await client.get(url, config);
    return data;
  } catch (error) {
    if (!isRetryableGetError(error)) throw error;
    await sleep(RETRY_DELAY_MS);
    const { data } = await client.get(url, config);
    return data;
  }
};

/**
 * Portfolio REST API client.
 * All methods return response data or throw on network/server errors.
 */
export const api = {
  /**
   * @returns {Promise<Object>} Portfolio hero info (name, links, tagline)
   */
  getPortfolioInfo: () => getWithRetry('/portfolio/info'),

  /**
   * @returns {Promise<Array>} All projects
   */
  getProjects: () => getWithRetry('/projects'),

  /**
   * @param {number} id - Project id
   * @returns {Promise<Object>} Single project
   */
  getProject: (id) => getWithRetry(`/projects/${id}`),

  /**
   * @returns {Promise<Object>} About section content
   */
  getAbout: () => getWithRetry('/about'),

  /**
   * @returns {Promise<Array>} Skill categories with proficiency
   */
  getSkills: () => getWithRetry('/skills'),

  /**
   * @returns {Promise<Array>} Work experience timeline entries
   */
  getExperience: () => getWithRetry('/experience'),

  /**
   * @returns {Promise<Array>} Certification records
   */
  getCertifications: () => getWithRetry('/certifications'),

  /**
   * @returns {Promise<Array>} Testimonial / recommendation entries
   */
  getTestimonials: () => getWithRetry('/testimonials'),

  /**
   * @returns {Promise<Array>} Blog post placeholders
   */
  getBlogPosts: () => getWithRetry('/blog'),

  /**
   * @returns {Promise<Object>} GitHub user stats and readme-stat card URLs
   */
  getGitHubStats: async () => {
    try {
      return await getWithRetry('/github/stats', { timeout: 45000 });
    } catch (error) {
      if (!isRetryableGetError(error)) throw error;
      await sleep(RETRY_DELAY_MS);
      const { data } = await client.get('/github/stats', { timeout: 45000 });
      return data;
    }
  },

  /**
   * @returns {Promise<Object>} Visit analytics totals
   */
  getVisitStats: () => getWithRetry('/analytics/visit'),

  /**
   * Records a page visit for analytics.
   * @param {string} [path='/'] - Page path visited
   * @returns {Promise<Object>}
   */
  trackVisit: async (path = '/') => {
    const { data } = await client.post('/analytics/visit', { path });
    return data;
  },

  /**
   * @param {{ name: string, email: string, message: string }} payload
   * @returns {Promise<Object>} Success response
   */
  sendContactMessage: async (payload) => {
    const { data } = await client.post('/contact', payload);
    return data;
  },
};

export default api;
