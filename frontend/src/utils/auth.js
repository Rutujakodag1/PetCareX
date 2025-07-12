// src/utils/auth.js

import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

export const refresh = async () => {
  const refreshToken = localStorage.getItem('refresh');
  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${baseUrl}/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccess = response.data.access;
    localStorage.setItem('access', newAccess);
    return newAccess;

  } catch (err) {
    console.error('Token refresh failed:', err);
    return null;
  }
};
