import axios from "axios";
const API = "http://localhost:5000/api";

export const login = (credi) => axios.post(`${API}/auth/login`, credi);
export const signUp = (userData) => axios.post(`${API}/auth/signup`, userData);
export const updateProfile = (profileData, token) => {
  return axios.put(`${API}/users/profile`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserById = (userId) => {
  return axios.get(`${API}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const emailVerification = (userId) => {
  return axios.post(`${API}/auth/send-verification`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const mailingOTP = (email) => {
  return axios.post(`${API}/auth/forgot-password`, email);
};

export const verifyOTP = (data) => {
    return axios.post(`${API}/auth/verify-otp`, data);
}

export const resetPassword = (data) => {
    return axios.put(`${API}/auth/reset-password`, data);
}