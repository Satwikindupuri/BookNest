import React from 'react';

const Layout = ({ children }) => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {children}
    </div>
  );
};

export default Layout;
