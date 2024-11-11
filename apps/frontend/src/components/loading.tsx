// Loading.tsx
import React from 'react';
import ReactLoading from 'react-loading';

const Loading: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <ReactLoading type="cubes" color="#fff" height={250} width={300} />
  </div>
);

export default Loading;
