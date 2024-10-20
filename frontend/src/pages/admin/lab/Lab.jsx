import "../list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import LabTable from "./LabTable";
import LabForm from "./LabForm";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'; 
import axios from 'axios'; // Import axios

const Lab = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [labs, setLabs] = useState([]);
  const location = useLocation();
  const patientId = location.state?.patientId; 

  // Fetch lab tests data on component mount
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('/tests/'); // Use axios to fetch labs
        setLabs(response.data); // Directly set response data
      } catch (error) {
        console.error("Error fetching lab tests:", error);
      }
    };
    fetchLabs();
  }, []);

  // Handle form submission for adding/updating labs
  const handleFormSubmit = async (formData) => {
    console.log("Submitting FormData:", formData);
  
    try {
      let response;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set this
        },
      };
  
      if (initialData) {
        response = await axios.put(`/tests/${initialData.lab_Id}`, formData, config);
      } else {
        response = await axios.post('/tests/add', formData, config);
      }
  
      setLabs((prev) =>
        initialData
          ? prev.map(item => (item.lab_Id === initialData.lab_Id ? response.data : item))
          : [...prev, response.data]
      );
  
      // Refresh labs list
      const updatedLabsResponse = await axios.get('/tests/');
      setLabs(updatedLabsResponse.data);
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
    } finally {
      setIsFormVisible(false);
      setInitialData(null);
    }
  };

  // Handle editing a lab test entry
  const handleEdit = (data) => {
    setInitialData(data);
    setIsFormVisible(true);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* Add New button is here, for table page only */}
        <button onClick={() => setIsFormVisible(true)} className="datatableTitle">Add New Lab Test</button>
        {isFormVisible && (
          <LabForm
            handleSubmit={handleFormSubmit}
            initialData={initialData}
            patientId={patientId}
          />
        )}
        <LabTable data={labs} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Lab;
