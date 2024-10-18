import "../../pages/admin/list/list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Analysis from "./Analysis"

const AnalysisScreen = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Analysis/>
      </div>
    </div>
  )
}

export default AnalysisScreen