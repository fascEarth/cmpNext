/** @type {import('next').NextConfig} */
const nextConfig = {
  development: {
    javaAPI: {
      BASE_URL: 'http://10.201.92.122:8080',
      DEFAULT_URL:'/dcc/api/'
    },
    pythonAPI: {
      BASE_URL: 'http://10.201.92.122:9996',
      DEFAULT_URL:'/api/dcc/v2/'
    },
  },
  staging: {
    javaAPI: {
      BASE_URL: 'http://10.201.92.122:8080',
      DEFAULT_URL:'/dcc/api/'
    },
    pythonAPI: {
      BASE_URL: 'http://10.201.92.122:9996',
      DEFAULT_URL:'/api/dcc/v2/'
    },
  },
  production: {
    javaAPI: {
      BASE_URL: 'http://10.201.92.122:8080',
      DEFAULT_URL:'/dcc/api/'
    },
    pythonAPI: {
      BASE_URL: 'http://10.201.92.122:9996',
      DEFAULT_URL:'/api/dcc/v2/'
    },
  },
  reactStrictMode: true,
}

const envConfig = {  
  JAVA_API_BASE_URL: nextConfig[process.env.NODE_ENV].javaAPI.BASE_URL,
  PYTHON_API_BASE_URL: nextConfig[process.env.NODE_ENV].pythonAPI.BASE_URL,
  JAVA_API_DEFAULT_URL: nextConfig[process.env.NODE_ENV].javaAPI.DEFAULT_URL,
  PYTHON_API_DEFAULT_URL: nextConfig[process.env.NODE_ENV].pythonAPI.DEFAULT_URL,
};

module.exports = {
  env: envConfig,
};
