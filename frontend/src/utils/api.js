import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const client = axios.create({
  baseURL: API,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Portfolio REST API client.
 * All methods return response data or throw on network/server errors.
 */
export const api = {
  /**
   * @returns {Promise<Object>} Portfolio hero info (name, links, tagline)
   */
  getPortfolioInfo: async () => {
    const { data } = await client.get('/portfolio/info');
    return data;
  },

  /**
   * @returns {Promise<Array>} All projects
   */
  getProjects: async () => {
    const { data } = await client.get('/projects');
    return data;
  },

  /**
   * @param {number} id - Project id
   * @returns {Promise<Object>} Single project
   */
  getProject: async (id) => {
    const { data } = await client.get(`/projects/${id}`);
    return data;
  },

  /**
   * @returns {Promise<Object>} About section content
   */
  getAbout: async () => {
    const { data } = await client.get('/about');
    return data;
  },

  /**
   * @returns {Promise<Array>} Skill categories with proficiency
   */
  getSkills: async () => {
    const { data } = await client.get('/skills');
    return data;
  },

  /**
   * @returns {Promise<Array>} Work experience timeline entries
   */
  getExperience: async () => {
    const { data } = await client.get('/experience');
    return data;
  },

  /**
   * @returns {Promise<Array>} Certification records
   */
  getCertifications: async () => {
    const { data } = await client.get('/certifications');
    return data;
  },

  /**
   * @returns {Promise<Array>} Testimonial / recommendation entries
   */
  getTestimonials: async () => {
    const { data } = await client.get('/testimonials');
    return data;
  },

  /**
   * @returns {Promise<Array>} Blog post placeholders
   */
  getBlogPosts: async () => {
    const { data } = await client.get('/blog');
    return data;
  },

  /**
   * @returns {Promise<Object>} GitHub user stats and readme-stat card URLs
   */
  getGitHubStats: async () => {
    const { data } = await client.get('/github/stats', { timeout: 45000 });
    return data;
  },

  /**
   * @returns {Promise<Object>} Visit analytics totals
   */
  getVisitStats: async () => {
    const { data } = await client.get('/analytics/visit');
    return data;
  },

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
