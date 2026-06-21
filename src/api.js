import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

export const getTeamMembers = () => api.get("/team-members/").then((r) => r.data);
export const getPartners = () => api.get("/partners/").then((r) => r.data);
export const getInitiatives = () => api.get("/initiatives/").then((r) => r.data);
export const getEvents = () => api.get("/events/").then((r) => r.data);
