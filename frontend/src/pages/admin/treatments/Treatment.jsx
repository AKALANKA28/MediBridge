import "../list/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import TreatmentTable from "./TreatmentTable";
import TreatmentForm from "./TreatmentForm";
import { useState, useEffect } from "react"; // Import useEffect for fetching data

const Treatment = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [treatments, setTreatments] = useState([]); // State to hold treatment data

  // Fetch treatments data on mount
  useEffect(() => {
    const fetchTreatments = async () => {
      const response = await fetch('http://localhost:8080/treatments/'); // Replace with your actual API endpoint
      const result = await response.json();
      setTreatments(result); // Update state with fetched treatments
    };

    fetchTreatments();
  }, []);

  const handleFormSubmit = async (data) => {
    console.log("Submitted data:", data);

    if (initialData) {
      await fetch(`http://localhost:8080/treatments/${initialData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setTreatments(prev =>
        prev.map(item => (item._id === initialData.id ? { ...item, ...data } : item))
      );
    } else {
      await fetch('http://localhost:8080/treatments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await fetch('http://localhost:8080/treatments/');
      const result = await response.json();
      setTreatments(result);
    }

    setIsFormVisible(false); // Hide the form after submission
    setInitialData(null); // Reset initial data
  };

  const handleEdit = (data) => {
    setInitialData(data); // Set the data to be edited
    setIsFormVisible(true); // Show the form for editing
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
            patientId={initialData ? initialData.patientId : ""} // Pass patientId to the form
          /> 
        )}
        <TreatmentTable data={treatments} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Treatment;
