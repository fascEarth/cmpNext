import axios from 'axios';


const pythonAPIBaseURL = process.env.PYTHON_API_BASE_URL;
const pythonAPIDefaultURL = process.env.PYTHON_API_DEFAULT_URL;

const ownAPIBaseURL = process.env.CONSOLE_API_BASE_URL;
const ownAPIDefaultURL = process.env.CONSOLE_API_DEFAULT_URL;

const api = axios.create({
  baseURL: pythonAPIBaseURL+pythonAPIDefaultURL,
});

const apiOwn = axios.create({
  baseURL: ownAPIBaseURL+ownAPIDefaultURL,
});

const authInterceptor = (config) => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  };

api.interceptors.request.use(authInterceptor);

const authInterceptorOwn = (config) => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
};

apiOwn.interceptors.request.use(authInterceptorOwn);

export const getPyApi = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const postPyApi = async (url, data) => {
  try {
    
    const response = await api.post(url, data);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const postPyApiAuth = async (url, data,token) => {
  try {
    console.log(data)
    console.log(JSON.stringify(data).length.toString())
    const headers = {
      //'Authorization': `Basic_${token}`,      
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': JSON.stringify(data).length.toString(),
    };
    const response = await apiOwn.post(url, JSON.stringify(data), { headers });
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};


export const putPyApi = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deletePyApi = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
