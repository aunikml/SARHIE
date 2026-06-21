import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      if (!window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(err);
  }
);

export const login = async (username, password) => {
  const r = await api.post("/auth/login/", { username, password });
  localStorage.setItem("access_token", r.data.access);
  localStorage.setItem("refresh_token", r.data.refresh);
  return r.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getHeroContent = () => api.get("/hero/latest/").then((r) => r.data);
export const getAboutContent = () => api.get("/about/latest/").then((r) => r.data);
export const getTeamMembers = () => api.get("/team-members/").then((r) => r.data);
export const getPartners = () => api.get("/partners/").then((r) => r.data);
export const getInitiatives = () => api.get("/initiatives/").then((r) => r.data);
export const getEvents = () => api.get("/events/").then((r) => r.data);

export const crud = (endpoint) => ({
  list: () => api.get(`/${endpoint}/`).then((r) => r.data),
  get: (id) => api.get(`/${endpoint}/${id}/`).then((r) => r.data),
  create: (data) => api.post(`/${endpoint}/`, data).then((r) => r.data),
  update: (id, data) => api.patch(`/${endpoint}/${id}/`, data).then((r) => r.data),
  delete: (id) => api.delete(`/${endpoint}/${id}/`),
});
