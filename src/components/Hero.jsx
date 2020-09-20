import React from 'react';

const Hero = (props) => {
  const { heroImage, bgColor, heroText } = props;
  
  return (
    <div className="hero" style={{backgroundColor: `${bgColor ? bgColor : '#55789b'}`}}>
      <img className="hero__img" alt="" src={`${window.location.origin}/${heroImage ? heroImage : 'hero/BeerOlympicsLogoNoText.png'}`} />
      <div className="hero__text-box">
        <h1 className="hero__text">{heroText}</h1>
      </div>
    </div>
  );
};

export default Hero;