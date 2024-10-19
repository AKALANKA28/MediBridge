import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import "./home.scss";
import CreateWardForm from "../../components/analysis/CreateWardForm";
import AdmitPatientForm from "../../components/analysis/AdmitPatientForm";
import WardPatientsTable from "../../components/analysis/WardPatientsTable";

const ManageWardsScreen = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="charts">
<AdmitPatientForm/>
        </div>
        <div className="listContainer">
          <div className="listTitle">Ward Admits</div>
        <WardPatientsTable/>
        </div>
      </div>
    </div>
  );
};

export default ManageWardsScreen;
