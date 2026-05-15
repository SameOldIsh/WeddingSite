import React from 'react';
import '../styles/footer.css';
import FooterImage from '../images/woods.png';

export default function Footer() {
  return (
    <footer className="app-footer">
      <img src={FooterImage} alt="Footer" className="footer-image" />
    </footer>
  );
}