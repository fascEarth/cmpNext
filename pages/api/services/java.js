import axios from 'axios';
import Cookies from 'js-cookie';
//import { getAuthToken } from '../../../utils/token/token';
const javaAPIBaseURL = process.env.JAVA_API_BASE_URL;

const javaAPIDefaultURL = process.env.JAVA_API_DEFAULT_URL;

// Retrieve the token from localStorage
//const authToken = localStorage.getItem('accessToken');

const api = axios.create({
  baseURL: javaAPIBaseURL+javaAPIDefaultURL,
});

const authInterceptor = (config) => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Basic_${accessToken}`;
    }
  }
  return config;
};

api.interceptors.request.use(authInterceptor);

export const getApi = async (url, token) => {
  
  try {   
    

  
    
    const headers = {
      'Authorization': `Basic_${token}`      
    };

    const response = await api.get(url,{ headers });    
    //const response = await api.get(url);    
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const postApi = async (url, data, token) => {
  try {
    const headers = {
      'Authorization': `Basic_${token}`      
    };

    
    const response = await api.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const postApiPayments = async (url, data, token) => {
  try {
    const headers = {
      'Authorization': `Basic_${token}`,      
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': JSON.stringify(data).length.toString(),
    };
    const response = await api.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const putApi = async (url, data, token) => {
  try {
    const headers = {
      'Authorization': `Basic_${token}`      
    };
    const response = await api.put(url, data,  { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const putApiwH = async (url, data,token) => {
  try {
    const headers = {
      'Authorization': `Basic_${token}`,
      'Content-Type': 'application/json',
    };
    const response = await api.put(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteApi = async (url,token) => {
  const headers = {
    'Authorization': `Basic_${token}`      
  };
  try {
    const response = await api.delete(url,{ headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
