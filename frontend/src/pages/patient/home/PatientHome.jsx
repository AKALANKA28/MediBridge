import Sidebar from "../../../components/patient/sidebar/Sidebar";
import Navbar from "../../../components/patient/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/widget/Widget";
import Featured from "../../../components/patient/featured/Featured";
import Chart from "../../../components/patient/chart/Chart";
import Table from "../../../components/patient/table/Table";
import HomeComponent from "../../../components/home/HomeComponent";
import QRCodeScreen from "../../../components/home/QRCode";

const PatientHome = () => {
  return (
    <>
      <div className="homeComponent">
        <HomeComponent />
      </div>
      <div className="      home2
">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div style={{ textAlign: "left", margin: "20px", fontWeight: "700", fontSize: "24px" }}>
            Health Card
          </div>
          <QRCodeScreen />
        </div>
      </div>
      home2
    </>
  );
};

export default PatientHome;
