import axios from "axios";
const API = ""; // Use relative paths to trigger the Vite proxy

export const login = (credi) => axios.post(`${API}/login`, credi);
export const signUp = (userData) => axios.post(`${API}/signup`, userData);
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
export const emailVerification = (token) => {
  return axios.post(
    `${API}/send-verification`,
    {}, // body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const mailingOTP = (email) => {
  return axios.post(`${API}/forgot-password`, email);
};

export const verifyOTP = (data) => {
  return axios.post(`${API}/verify-otp`, data);
}

export const resetPassword = (data) => {
  return axios.put(`${API}/reset-password`, data);
}
export const deleteAccount = (email) => {
  return axios.delete(`${API}/users/account`, {
    data: { email },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

export const userSettings = (settings) => {
  return axios.post(
    `${API}/users/settings`,
    settings,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
};