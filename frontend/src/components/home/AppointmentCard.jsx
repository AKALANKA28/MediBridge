import React from "react";
import "./AppointmentCard.scss";
import profilePic from "../../assets/imageProfile.svg";
import clockIcon from "../../assets/image-4.svg";
import moreIcon from "../../assets/image-3.svg";
import callIcon from "../../assets/image-2.svg";

const AppointmentCard = () => {
  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <div className="appointment-time">
          <span className="appointment-date">Appointment date</span>
          <div className="appointment-info">
            <img src={clockIcon} alt="Clock Icon" className="icon" />
            <span className="date">Wed Jun 20</span>
            <span className="time">8:00-8:30AM</span>
          </div>
        </div>
        <img src={moreIcon} alt="More Options" className="more-options" />
      </div>
      <div className="separator"></div>
      <div className="appointment-details">
        <img src={profilePic} alt="Doctor" className="profile-pic" />
        <div className="doctor-info">
          <span className="doctor-name">Dr. Nirmala Soyza</span>
          <span className="specialty">Orthopedic</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
