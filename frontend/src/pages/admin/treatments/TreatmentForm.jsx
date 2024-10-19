import React, { useState, useEffect } from "react";
import "./TreatmentForm.scss";

const TreatmentForm = ({ handleSubmit, initialData, patientId }) => {
  const [formData, setFormData] = useState({
    treatment_Id: initialData?.treatment_Id || "",
    treatment_Name: initialData?.treatment_Name || "",
    doctor_Name: initialData?.doctor_Name || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        treatment_Id: initialData.treatment_Id,
        treatment_Name: initialData.treatment_Name,
        doctor_Name: initialData.doctor_Name,
        date: initialData.date,
        description: initialData.description,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Create FormData object to submit
    const submitData = new FormData();
    submitData.append("treatment_Id", formData.treatment_Id);
    submitData.append("treatment_Name", formData.treatment_Name);
    submitData.append("doctor_Name", formData.doctor_Name);
    submitData.append("date", formData.date);
    submitData.append("description", formData.description);
    submitData.append("patientId", patientId); // Include patientId if needed

    // Log the FormData entries for debugging
    console.log("FormData object entries:");
    for (const [key, value] of submitData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    // Call the submit function passed from the parent
    handleSubmit(submitData);
  };
  
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Treatment Form</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleFormSubmit}>
              <div className="formInput">
                <label htmlFor="treatment_Id">Treatment ID</label>
                <input
                  type="text"
                  name="treatment_Id"
                  value={formData.treatment_Id}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formInput">
                <label htmlFor="treatment_Name">Treatment Name</label>
                <input
                  type="text"
                  name="treatment_Name"
                  value={formData.treatment_Name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formInput">
                <label htmlFor="doctor_Name">Doctor Name</label>
                <input
                  type="text"
                  name="doctor_Name"
                  value={formData.doctor_Name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formInput">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formInput">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentForm;
