// LoadingIndicator.js

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIndicator = ({ isLoading }) => {
  return isLoading ? (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <CircularProgress />
    </div>
  ) : null;
};

export default LoadingIndicator;
