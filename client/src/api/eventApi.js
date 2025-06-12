import axios from 'axios';

const API_BASE = 'http://localhost:3001/event'; 

export const fetchEvents = (params) => axios.get(`${API_BASE}/get-all-events`, { params });
export const getEvent = (id) => axios.get(`${API_BASE}/${id}`);
export const createEvent = (data) => axios.post(`${API_BASE}/add-event`, data);
export const updateEvent = (id, data) => axios.put(`${API_BASE}/update-event/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${API_BASE}/delete-event/${id}`);
export const registerAttendee = (id, data) => axios.post(`${API_BASE}/register-attendee/${id}`, data);
export const getAnalytics = (id) => axios.get(`${API_BASE}/analytics/${id}`);
export const getAttendees = (id) => axios.get(`${API_BASE}/attendees/${id}`);
