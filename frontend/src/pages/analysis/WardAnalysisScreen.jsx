import "../../pages/admin/list/list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import WardKPISection from "../../components/analysis/WardKPISection"
import WardAnalysis from "./WardAnalysis"

const WardAnalysisScreen = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <WardAnalysis/>
      </div>
    </div>
  )
}

export default WardAnalysisScreen