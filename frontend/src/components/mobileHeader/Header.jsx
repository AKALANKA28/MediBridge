import React from 'react';
import'./Header.scss';
import image from '../../assets/DoctorImg.png';

const Header = () => {
  const handleBackClick = () => {
    window.history.back(); // Goes back to the previous page in the browser history
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <img src={image} alt="Icon" className="mobileiHeaderIcon" onClick={handleBackClick} />
        <span className="header-text">MediBridge Health Card</span>
      </div>
    </div>
  );
};

export default Header;
