let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const getAuthToken = () => {
  if (!authToken) {
    throw new Error("Token not found");
  }
  return authToken;
};
