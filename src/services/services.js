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
    },
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
    },
  );
};
export const deletAllNotifications = () => {
  return axios.delete(`${API}/notifications`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};


export const getStores = () => {
  return axios.get(`${API}/stores`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const getProducts = () => {
  return axios.get(`${API}/products`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const addStore = (data) => {
  return axios.post(`${API}/stores`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const addProduct = (data) => {
  return axios.post(`${API}/products`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getAllUsers = () => {
  return axios.get(`${API}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const getAdminReplies = () => {
  return axios.get(`${API}/emails/admin-replies`, {
    params: {
      page: 1,
      limit: 200,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getAPIKeys = () => {
  return axios.get(`${API}/api-keys`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getAllEmails = (page = 1, limit = 50) => {
  return axios.get(`${API}/emails/admin/all`, {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const getAllNotifications = () => {
  return axios.get(`${API}/notifications/all`, {
    headers: {
      Authorization : `Bearer ${localStorage.getItem("token")}`
    },
  });
};

export const deleteStore=(id)=>{
  return axios.delete(`${API}/stores/${id}`,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
}

export const getStoreByid=(id)=>{
  return axios.get(`${API}/stores/${id}`,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
}

export const updateStore=(id,data)=>{
  return axios.put(`${API}/stores/${id}`,data,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
}

export const getProductByid=(id)=>{
  return axios.get(`${API}/products/${id}`,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
}
export const deletProduct=(id)=>{
  return axios.delete(`${API}/products/${id}`,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
}
export const updateProduct=(id,data)=>{
  return axios.put(`${API}/products/${id}`,data,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
} 
export const adminDeletesUser=(id)=>{
  return axios.delete(`${API}/users/${id}`,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
}
//*********************** its does not work yet */
// export const getUserAdmin=(id)=>{
//   return axios.get(`${API}/users/${id}`,{
//     headers:{
//       Authorization:`Bearer ${localStorage.getItem("token")}`
//     }
//   })
// }
//*********************** its does not work yet */
