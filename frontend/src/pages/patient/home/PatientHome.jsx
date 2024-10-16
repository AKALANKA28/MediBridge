import Sidebar from "../../../components/patient/sidebar/Sidebar";
import Navbar from "../../../components/patient/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/widget/Widget";
import Featured from "../../../components/patient/featured/Featured";
import Chart from "../../../components/patient/chart/Chart";
import Table from "../../../components/patient/table/Table";
import HomeComponent from "../../../components/home/HomeComponent";

const PatientHome = () => {
  return (
    <>
      <div className="homeComponent">
        <HomeComponent />
      </div>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            {/* <Widget type="balance" /> */}
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientHome;
