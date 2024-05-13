import React from 'react';
import './Footer.css';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-logo">
                <p>Style Savvy</p>
            </div>
            <ul className='footer-links'>
                <li>company</li>
                <li>products</li>
                <li>offices</li>
                <li>About</li>
                <li>Contact </li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={pintester_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2023 - ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    )
}

export default Footer;
