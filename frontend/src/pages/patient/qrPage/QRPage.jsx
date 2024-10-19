import Sidebar from "../../../components/patient/sidebar/Sidebar";
import Navbar from "../../../components/patient/navbar/Navbar";
import "../home/home.scss";
import QRCodeScreen from "../../../components/home/QRCode";

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
          <div style={{ textAlign: "left", margin: "20px", fontWeight: "700", fontSize: "24px" }}>
            Health Card
          </div>
          <QRCodeScreen />
        </div>
      </div>
    </>
  );
};

export default QRPage;
