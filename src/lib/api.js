import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor – attach JWT
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = Cookies.get('refresh_token');
        const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh });
        Cookies.set('access_token', data.access, { expires: 1 });
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth
export const authAPI = {
  login: (data) => api.post('/auth/login/', data),
  register: (data) => api.post('/auth/register/', data),
  logout: () => api.post('/auth/logout/'),
  forgotPassword: (email) => api.post('/auth/forgot-password/', { email }),
  resetPassword: (data) => api.post('/auth/reset-password/', data),
  profile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.put('/auth/profile/', data),
};

// Courses
export const coursesAPI = {
  list: (params) => api.get('/courses/', { params }),
  detail: (id) => api.get(`/courses/${id}/`),
  featured: () => api.get('/courses/featured/'),
};

// Applications
export const applicationsAPI = {
  create: (data) => api.post('/applications/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  list: () => api.get('/applications/'),
  detail: (id) => api.get(`/applications/${id}/`),
  myApplications: () => api.get('/applications/my/'),
  updateStatus: (id, status) => api.patch(`/applications/${id}/status/`, { status }),
};

// Departments
export const departmentsAPI = {
  list: () => api.get('/departments/'),
  detail: (id) => api.get(`/departments/${id}/`),
};

// News
export const newsAPI = {
  list: (params) => api.get('/news/', { params }),
  detail: (id) => api.get(`/news/${id}/`),
  featured: () => api.get('/news/featured/'),
};

// Gallery
export const galleryAPI = {
  list: (params) => api.get('/gallery/', { params }),
  categories: () => api.get('/gallery/categories/'),
};

// Contacts
export const contactsAPI = {
  send: (data) => api.post('/contacts/', data),
  list: () => api.get('/contacts/'),
};

// Testimonials
export const testimonialsAPI = {
  list: () => api.get('/testimonials/'),
};

// Staff
export const staffAPI = {
  list: () => api.get('/staff/'),
  detail: (id) => api.get(`/staff/${id}/`),
};

// Admin
export const adminAPI = {
  stats: () => api.get('/admin/stats/'),
  students: (params) => api.get('/admin/students/', { params }),
  applications: (params) => api.get('/admin/applications/', { params }),
  createCourse: (data) => api.post('/courses/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateCourse: (id, data) => api.put(`/courses/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteCourse: (id) => api.delete(`/courses/${id}/`),
  createNews: (data) => api.post('/news/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateNews: (id, data) => api.put(`/news/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteNews: (id) => api.delete(`/news/${id}/`),
  uploadGallery: (data) => api.post('/gallery/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteGallery: (id) => api.delete(`/gallery/${id}/`),
  messages: () => api.get('/contacts/'),
  deleteMessage: (id) => api.delete(`/contacts/${id}/`),
};
