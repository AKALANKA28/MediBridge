import "../list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import TreatmentTable from "./TreatmentTable";
import TreatmentForm from "./TreatmentForm";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'; 
import axios from 'axios'; // Import axios

const Treatment = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const location = useLocation();
  const patientId = location.state?.patientId; 

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get('/treatments/'); // Use axios to fetch treatments
        setTreatments(response.data); // Directly set response data
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };
    fetchTreatments();
  }, []);

  const handleFormSubmit = async (formData) => {
    console.log("Submitting FormData:", formData); // This should be logging FormData
  
    // If formData is not appearing correctly, iterate over its entries to debug
    for (const [key, value] of formData.entries()) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  
    try {
      let response;
      if (initialData) {
        response = await axios.put(`/treatments/${initialData.treatment_Id}`, formData);
      } else {
        response = await axios.post('/treatments/add', formData);
      }
  
      // Updating state as before...
      setTreatments((prev) =>
        initialData
          ? prev.map(item => (item.treatment_Id === initialData.treatment_Id ? response.data : item))
          : [...prev, response.data]
      );
  
      // Fetch updated treatments
      const updatedTreatmentsResponse = await axios.get('/treatments/');
      setTreatments(updatedTreatmentsResponse.data);
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
    } finally {
      setIsFormVisible(false);
      setInitialData(null);
    }
  };
  
  

  const handleEdit = (data) => {
    setInitialData(data);
    setIsFormVisible(true);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <button onClick={() => setIsFormVisible(true)} className="datatableTitle">Add New</button>
        {isFormVisible && (
          <TreatmentForm
            handleSubmit={handleFormSubmit}
            initialData={initialData}
            patientId={patientId}
          />
        )}
        <TreatmentTable data={treatments} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Treatment;
