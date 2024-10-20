import "../list/list.scss"; // Import styles
import Sidebar from "../../../components/sidebar/Sidebar"; // Sidebar component
import Navbar from "../../../components/navbar/Navbar"; // Navbar component
import TreatmentTable from "./TreatmentTable"; // Table to display treatments
import TreatmentForm from "./TreatmentForm"; // Form to add/update treatments
import { useState, useEffect } from "react"; // React hooks
import { useLocation } from 'react-router-dom'; // For accessing route state
import axios from 'axios'; // Axios for HTTP requests

const Treatment = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility (State Pattern)
  const [initialData, setInitialData] = useState(null); // State for initial data when editing (State Pattern)
  const [treatments, setTreatments] = useState([]); // State for storing treatments (State Pattern)
  const location = useLocation(); // Get location object
  const patientId = location.state?.patientId; // Get patient ID from route state

  // Fetch treatments data on component mount
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get('/treatments/'); // Fetch treatments from API
        setTreatments(response.data); // Set fetched treatments to state
      } catch (error) {
        console.error("Error fetching treatments:", error); // Log errors
      }
    };
    fetchTreatments();
  }, []); // Empty dependency array means this runs once when the component mounts (Lifecycle Method Pattern)

  // Handle form submission for adding/updating treatments
  const handleFormSubmit = async (formData) => {
    console.log("Submitting FormData:", formData); // Log submitted data
  
    try {
      let response;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set this for form submission
        },
      };
  
      // Determine if we are updating or creating a new treatment
      if (initialData) {
        response = await axios.put(`/treatments/${initialData.treatment_Id}`, formData, config); // Update existing treatment
      } else {
        response = await axios.post('/treatments/add', formData, config); // Create new treatment
      }
  
      // Update the treatments list in state
      setTreatments((prev) =>
        initialData
          ? prev.map(item => (item.treatment_Id === initialData.treatment_Id ? response.data : item)) // Update specific treatment
          : [...prev, response.data] // Add new treatment
      );
  
      // Refresh treatments list
      const updatedTreatmentsResponse = await axios.get('/treatments/');
      setTreatments(updatedTreatmentsResponse.data); // Update state with refreshed data
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message); // Log submission errors
    } finally {
      setIsFormVisible(false); // Hide form after submission (State Pattern)
      setInitialData(null); // Reset initial data
    }
  };

  // Handle editing a treatment entry
  const handleEdit = (data) => {
    setInitialData(data); // Set the data to be edited (State Pattern)
    setIsFormVisible(true); // Show the form (State Pattern)
  };

  return (
    <div className="list">
      <Sidebar /> {/* Sidebar component */}
      <div className="listContainer">
        <Navbar /> {/* Navbar component */}
        <button onClick={() => setIsFormVisible(true)} className="datatableTitle">Add New</button> {/* Button to show form */}
        {isFormVisible && (
          <TreatmentForm
            handleSubmit={handleFormSubmit} // Pass submit handler to form
            initialData={initialData} // Pass initial data for editing
            patientId={patientId} // Pass patient ID
          />
        )}
        <TreatmentTable data={treatments} onEdit={handleEdit} /> {/* Render the treatment table */}
      </div>
    </div>
  );
};

export default Treatment; // Export the Treatment component
