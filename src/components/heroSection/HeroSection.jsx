import React from 'react';
import style from './heroSection.module.css';

const HeroSection = ({ imageSrc, title, subtitle, description }) => {
    return (
        <div className={`${style.herosection}`}>
            <img src={imageSrc || '/default-logo.png'} alt={title || 'Logo'} />
            <h5>{title}</h5>
            <p>{description}</p>
        </div>
    );
};

export default HeroSection;
