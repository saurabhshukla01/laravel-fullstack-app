// src/components/layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class="app-footer">
        <div class="container text-center py-3">
            <small class="copyright">
                Designed with <span class="sr-only">love</span><i class="fas fa-heart" style={{ color: '#fb866a' }}></i> by <Link class="app-link" to="http://themes.3rdwavemedia.com" target="_blank">Xiaoying Riley</Link> for developers
            </small>
        </div>
    </footer>
  );
};

export default Footer;
