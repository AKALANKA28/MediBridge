import "./TreatmentForm.scss"; 
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"; 
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as yup from "yup";

// Validation Schema for Treatment
const TreatmentSchema = yup.object({
  treatment_Id: yup.string().matches(/^\d+$/, "Treatment ID must contain only numbers").required("Treatment ID is required"),
  treatment_Name: yup.string().matches(/^[A-Z][a-zA-Z\s]*$/, "Treatment Name must start with a capital letter and contain only letters").required("Treatment Name is required"),
  doctor_Name: yup.string().matches(/^[A-Z][a-zA-Z\s]*$/, "Doctor Name must start with a capital letter and contain only letters").required("Doctor Name is required"),
  date: yup.date().required("Date is required"),
  description: yup.string().optional().max(500, "Description must be at most 500 characters"),
});

const TreatmentForm = ({ handleSubmit, initialData, patientId }) => {
  const [file, setFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      treatment_Id: initialData?.treatment_Id || "",
      treatment_Name: initialData?.treatment_Name || "",
      doctor_Name: initialData?.doctor_Name || "",
      date: initialData?.date || "",
      description: initialData?.description || "",
      patientId: patientId || "",
    },
    validationSchema: TreatmentSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('treatment_Id', values.treatment_Id);
      formData.append('treatment_Name', values.treatment_Name);
      formData.append('doctor_Name', values.doctor_Name);
      formData.append('date', values.date);
      formData.append('description', values.description);
      formData.append('patientId', values.patientId);

      if (file) {
        formData.append('file', file);
      }

      handleSubmit(formData);
    },
  });

  useEffect(() => {
    if (initialData) {
      formik.setValues(initialData);
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
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="Uploaded File Preview" />
          </div>
          <div className="right">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" name="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div>
              <div className="formInput">
                <label htmlFor="treatment_Id">Treatment ID</label>
                <input type="text" name="treatment_Id" value={formik.values.treatment_Id} onChange={formik.handleChange} />
                {formik.touched.treatment_Id && formik.errors.treatment_Id && <div className="error">{formik.errors.treatment_Id}</div>}
              </div>
              <div className="formInput">
                <label htmlFor="treatment_Name">Treatment Name</label>
                <input type="text" name="treatment_Name" value={formik.values.treatment_Name} onChange={formik.handleChange} />
                {formik.touched.treatment_Name && formik.errors.treatment_Name && <div className="error">{formik.errors.treatment_Name}</div>}
              </div>
              <div className="formInput">
                <label htmlFor="doctor_Name">Doctor Name</label>
                <input type="text" name="doctor_Name" value={formik.values.doctor_Name} onChange={formik.handleChange} />
                {formik.touched.doctor_Name && formik.errors.doctor_Name && <div className="error">{formik.errors.doctor_Name}</div>}
              </div>
              <div className="formInput">
                <label htmlFor="date">Date</label>
                <input type="date" name="date" value={formik.values.date} onChange={formik.handleChange} />
                {formik.touched.date && formik.errors.date && <div className="error">{formik.errors.date}</div>}
              </div>
              <div className="formInput">
                <label htmlFor="description">Description</label>
                <textarea name="description" value={formik.values.description} onChange={formik.handleChange}></textarea>
                {formik.touched.description && formik.errors.description && <div className="error">{formik.errors.description}</div>}
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
