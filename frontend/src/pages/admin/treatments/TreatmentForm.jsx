import "./TreatmentForm.scss"; 
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"; 
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
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

  // Initialize form values with initialData if available
  const formik = useFormik({
    initialValues: {
      treatment_Id: initialData ? initialData.treatment_Id : "",
      patient_Name: initialData ? initialData.patient_Name : "",
      treatment_Name: initialData ? initialData.treatment_Name : "",
      doctor_Name: initialData ? initialData.doctor_Name : "",
      date: initialData ? initialData.date : "",
      description: initialData ? initialData.description : "",
    },
    validationSchema: TreatmentSchema,
    onSubmit: (values) => {
      // Use FormData to handle both text and file data
      const formData = new FormData();
      formData.append('treatment_Id', values.treatment_Id);
      formData.append('patient_Name', values.patient_Name);
      formData.append('treatment_Name', values.treatment_Name);
      formData.append('doctor_Name', values.doctor_Name);
      formData.append('date', values.date);
      formData.append('description', values.description);

      // Add the file to the FormData if it exists
      if (file) {
        formData.append('file', file);
      }

      handleSubmit(formData); // Include the FormData in the submitted data
    },
  });

  // Update form state when initialData changes
  useEffect(() => {
    if (initialData) {
      formik.setValues({
        treatment_Id: initialData.treatment_Id,
        patient_Name: initialData.patient_Name,
        treatment_Name: initialData.treatment_Name,
        doctor_Name: initialData.doctor_Name,
        date: initialData.date,
        description: initialData.description,
      });
    }
  }, [initialData]);

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Treatment Form</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Uploaded File Preview"
            />
          </div>
          <div className="right">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
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
                <label htmlFor="patient_Name" className="form-label">Patient Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="patient_Name"
                  placeholder="Patient Name"
                  value={formik.values.patient_Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.patient_Name && formik.errors.patient_Name && (
                  <div className="error">{formik.errors.patient_Name}</div>
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
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentForm;
