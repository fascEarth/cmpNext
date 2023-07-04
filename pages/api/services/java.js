import axios from 'axios';

const javaAPIBaseURL = process.env.JAVA_API_BASE_URL;

const javaAPIDefaultURL = process.env.JAVA_API_DEFAULT_URL;


const api = axios.create({
  baseURL: javaAPIBaseURL+javaAPIDefaultURL,
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

export const getApi = async (url) => {
  try {
   // console.log(url);
    const response = await api.get(url);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const postApi = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const postApiPayments = async (url, data) => {
  try {
    const headers = {
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

export const putApi = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteApi = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
