// src/components/layout/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <header class="app-header fixed-top">
        <Topbar/>
        <Sidebar />
      </header>
      <div className="app-wrapper">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
