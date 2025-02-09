import React from 'react';
import style from './heroSection.module.css';

const HeroSection = ({ title, description }) => {
    return (
        <div className={`${style.herosection}`}>
            <h5>{title}</h5>
            <p>{description}</p>
        </div>
    );
};

export default HeroSection;
