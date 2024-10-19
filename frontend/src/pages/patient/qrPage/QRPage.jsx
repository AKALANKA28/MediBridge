import Sidebar from "../../../components/patient/sidebar/Sidebar";
import Navbar from "../../../components/patient/navbar/Navbar";
// import "./home.scss";
import Widget from "../../../components/widget/Widget";
import Featured from "../../../components/patient/featured/Featured";
import Chart from "../../../components/patient/chart/Chart";
import Table from "../../../components/patient/table/Table";
import QRCodeScreen from "../../../components/home/QRCode";
// import QRCodeScreen from "../../../components/home/QRCode";

const QRPage = () => {
  return (
    <>
      {/* <div className="homeComponent">
        <QRCodeScreen/>
      </div> */}
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <QRCodeScreen/>
        </div>
      </div>
    </>
  );
};

export default QRPage;
