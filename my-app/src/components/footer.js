// footer.js
import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/footer.css";// CSS 연결

const Footer = () => {
  return (
    <footer className="footer">
    <p>&copy; Amor. All rights reserved.</p>
    <ul className="footer-links">
      <li><Link to="/privacy">Privacy Policy</Link></li>
      <li><Link to="/terms">Terms of Service</Link></li>
      <li><Link to="/help">Help</Link></li>
    </ul>
  </footer>
  );
};

export default Footer;
