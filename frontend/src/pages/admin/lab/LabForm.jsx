import "./LabForm.scss"; // Import the appropriate stylesheet
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"; // Import the icon
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as yup from "yup";

// Validation Schema for Lab Test
const LabSchema = yup.object({
  test_Id: yup
    .string()
    .matches(/^\d+$/, "Test ID must contain only numbers")
    .required("Test ID is required"),
  test_Name: yup
    .string()
    .matches(/^[A-Z][a-zA-Z\s]*$/, "Test Name must start with a capital letter and contain only letters")
    .required("Test Name is required"),
  test_result: yup
    .string()
    .required("Test result is required"),
  date: yup
    .date()
    .required("Date is required"),
  description: yup
    .string()
    .optional()
    .max(500, "Description must be at most 500 characters"),
});

const LabForm = ({ handleSubmit, initialData }) => {
  const [file, setFile] = useState(null); // State for file upload

  // Initialize form values with initialData if available
  const formik = useFormik({
    initialValues: {
      test_Id: initialData?.test_Id || "",
      test_Name: initialData?.test_Name || "",
      test_result: initialData?.test_result || "",
      date: initialData?.date || "",
      description: initialData?.description || "",
    },
    validationSchema: LabSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('test_Id', values.test_Id);
      formData.append('test_Name', values.test_Name);
      formData.append('test_result', values.test_result);
      formData.append('date', values.date);
      formData.append('description', values.description);

      if (file) {
        formData.append('file', file);
      }

      handleSubmit(formData); // Include the file in the submitted data
    },
  });

  // Update form state when initialData changes
  useEffect(() => {
    if (initialData) {
      formik.setValues(initialData);
    }
  }, [initialData]);

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Lab Test Form</h1>
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
              {/* Lab Test Form Fields */}
              <div className="formInput">
                <label htmlFor="test_Id">Test ID</label>
                <input
                  type="text"
                  name="test_Id"
                  value={formik.values.test_Id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.test_Id && formik.errors.test_Id && (
                  <div className="error">{formik.errors.test_Id}</div>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="test_Name">Test Name</label>
                <input
                  type="text"
                  name="test_Name"
                  value={formik.values.test_Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.test_Name && formik.errors.test_Name && (
                  <div className="error">{formik.errors.test_Name}</div>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="test_result">Test Result</label>
                <input
                  type="text"
                  name="test_result"
                  value={formik.values.test_result}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.test_result && formik.errors.test_result && (
                  <div className="error">{formik.errors.test_result}</div>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
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
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <div className="error">{formik.errors.description}</div>
                )}
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabForm;
