import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/p1_product1.png';

const Hero = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleShopButtonClick = () => {
        navigate('/shop');
    };

    return (
        <div className='hero'>
            <div className="hero-left">
                <div>
                    <p>New collections for everyone </p>
                </div>
                <div
                    className={`hero-latest-btn ${isHovered ? 'hovered' : ''}`}
                    onClick={handleShopButtonClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt='' />
                </div>
            </div>
            <div className="hero-right"></div>
            <img src={hero_image} alt='' />
        </div>
    );
};

export default Hero;
