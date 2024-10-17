import "./TreatmentForm.scss"; // Import the appropriate stylesheet
// import Sidebar from "../../../components/sidebar/Sidebar"; // Adjust the import path as necessary
// import Navbar from "../../../components/navbar/Navbar"; // Adjust the import path as necessary
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"; // Import the icon
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

// Validation Schema for Treatment
const TreatmentSchema = yup.object({
  treatment_Id: yup
    .string()
    .matches(/^\d+$/, "Treatment ID must contain only numbers")
    .required("Treatment ID is required"),
  treatment_Name: yup
    .string()
    .matches(/^[A-Z][a-zA-Z\s]*$/, "Treatment Name must start with a capital letter and contain only letters")
    .required("Treatment Name is required"),
  doctor_Name: yup
    .string()
    .matches(/^[A-Z][a-zA-Z\s]*$/, "Doctor Name must start with a capital letter and contain only letters")
    .required("Doctor Name is required"),
  date: yup
    .date()
    .required("Date is required"),
  description: yup
    .string()
    .optional()
    .max(500, "Description must be at most 500 characters"),
});

const TreatmentForm = ({ handleSubmit, initialData }) => {
  const [file, setFile] = useState(null); // State for file upload

  const formik = useFormik({
    initialValues: {
      treatment_Id: initialData ? initialData.treatment_Id : "",
      treatment_Name: initialData ? initialData.treatment_Name : "",
      doctor_Name: initialData ? initialData.doctor_Name : "",
      date: initialData ? initialData.date : "",
      description: initialData ? initialData.description : "",
    },
    validationSchema: TreatmentSchema,
    onSubmit: (values) => {
      handleSubmit({ ...values, file }); // Include the file in the submitted data
    },
  });

  return (
    <div className="new"> {/* Main container */}
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>Treatment Form</h1> {/* Title */}
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file) // Show uploaded file
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" // Default image
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={formik.handleSubmit}> {/* Form submission */}
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])} // Handle file change
                  style={{ display: "none" }}
                />
              </div>
              {/* Treatment Form Fields */}
              <div className="formInput">
                <label htmlFor="treatment_Id" className="form-label">Treatment ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="treatment_Id"
                  placeholder="Treatment ID"
                  value={formik.values.treatment_Id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.treatment_Id && formik.errors.treatment_Id && (
                  <div className="error">{formik.errors.treatment_Id}</div>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="treatment_Name" className="form-label">Treatment Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="treatment_Name"
                  placeholder="Treatment Name"
                  value={formik.values.treatment_Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.treatment_Name && formik.errors.treatment_Name && (
                  <div className="error">{formik.errors.treatment_Name}</div>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="doctor_Name" className="form-label">Doctor Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="doctor_Name"
                  placeholder="Doctor Name"
                  value={formik.values.doctor_Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.doctor_Name && formik.errors.doctor_Name && (
                  <div className="error">{formik.errors.doctor_Name}</div>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="error">{formik.errors.date}</div>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="description" className="form-label">Description (optional)</label>
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <button type="submit" className="btn btn-success">Submit</button> {/* Submit button */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentForm;
