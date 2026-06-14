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
export const emailVerification = (token) => {
  return axios.post(
    `${API}/auth/send-verification`,
    {}, // body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const mailingOTP = (email) => {
  return axios.post(`${API}/auth/forgot-password`, email);
};

export const verifyOTP = (data) => {
  return axios.post(`${API}/auth/verify-otp`, data);
};

export const resetPassword = (data) => {
  return axios.put(`${API}/auth/reset-password`, data);
};
export const deleteAccount = (email) => {
  return axios.delete(`${API}/users/account`, {
    data: { email },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const addImage = (base64) => {
  return axios.put(`${API}/users/user-image`, base64, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteImage = () => {
  return axios.delete(`${API}/users/user-image`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const notifications = (enabled) => {
  return axios.put(
    `${API}/users/settings/notifications`,
    {
      enabled,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
};
export const darkMode = (darkMode) => {
  return axios.put(
    `${API}/users/settings/dark-mode`,
    {
      darkMode,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
};
export const getNotifications = () => {
  return axios.get(`${API}/notifications`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const markAsReadAll = () => {
  return axios.patch(
    `${API}/notifications/read-all`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
export const markAsRead = (notificationID) => {
  return axios.patch(
    `${API}/notifications/${notificationID}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};