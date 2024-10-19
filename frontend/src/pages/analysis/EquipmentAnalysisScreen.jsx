import "../../pages/admin/list/list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Analysis from "./Analysis"
import EquipmentAnalysis from "./EquipmentAnalysis"

const EquipmentAnalysisScreen = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <EquipmentAnalysis/>
      </div>
    </div>
  )
}

export default EquipmentAnalysisScreen