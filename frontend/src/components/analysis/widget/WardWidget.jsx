// components/WardWidget.js
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";

const WardWidget = ({ type, amount, diff }) => {
  let data;

  switch (type) {
    case "totalWards":
      data = {
        title: "TOTAL WARDS",
        isMoney: false,
        link: "See all wards",
        icon: (
          <LocalHospitalOutlinedIcon
            className="icon"
            style={{
              color: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.2)",
            }}
          />
        ),
      };
      break;
    case "availableBeds":
      data = {
        title: "AVAILABLE BEDS",
        isMoney: false,
        link: "View bed availability",
        icon: (
          <HotelOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 193, 7, 0.2)",
              color: "orange",
            }}
          />
        ),
      };
      break;
    case "totalAdmittedPatients":
      data = {
        title: "ADMITTED PATIENTS",
        isMoney: false,
        link: "View all patients",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              color: "crimson",
            }}
          />
        ),
      };
      break;
    case "patientAdmissionRate":
      data = {
        title: "ADMISSION RATE",
        isMoney: false,
        link: "View admission stats",
        icon: (
          <GroupAddOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff >= 0 ? "positive" : "negative"}`}>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default WardWidget;
