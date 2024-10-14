import React, { useContext, useState , useEffect } from "react";
// import Home from "../admin/home/Home";
// import Login from "../login/Login";
// import PatientRegister from "./pages/register/PatientRegister";
// import List from "../admin/list/List";
// import Single from "../admin/single/Single";
// import New from "../admin/new/New";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
// import "./style/dark.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "../../context/drakModeContext";
// import { UserRoleContext } from "../../context/userRoleContext";
import { Html5QrcodeScanner } from "html5-qrcode";
// import { useState } from "react";


function Scan() {

  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {   const scanner = new Html5QrcodeScanner("reader", {
    qrbox: {
     width: 250,
     height: 250
   },
   fps:5,
  });

  scanner.render(success, error);

  function success(result) {
   scanner.clear();
   setScanResult(result);
   //  console.log("Success! Found QR code:", result);
  }
  
  function error(err) {
    console.warn(err);
  }
}, []);


    

      return (
        <div className="App">
          <h1>QR Code Scanning In React</h1>
          {scanResult
            ? <div>Success: <a href={"http://"+scanResult}>{scanResult}</a></div>
            :  <div id="reader"></div>
            }

        </div>
        
      );
  // const { darkMode } = useContext(DarkModeContext);
  // // const { userRole } = useContext(UserRoleContext); // Get user role from context

  // // Temporarily setting userRole to "admin" for testing purposes
  // const userRole = "admin"; // Hardcoded for testing purposes




  // // Render routes based on user role
  // const renderRoutes = () => {
  //   switch (userRole) {
  //     case "admin":
  //       return (
  //         <Routes>
  //           <Route path="/" element={< Home />} />
  //           <Route path="users" element={<List />} />
  //           <Route path="users/:userId" element={< Single />} />
  //           <Route path="users/new" element={<New />} />
  //         </Routes>
  //       );
  //     case "doctor":
  //       return (
  //         <Routes>
  //           {/* <Route path="/" element={<DoctorHome />} />
  //           <Route path="patients" element={<DoctorList />} />
  //           <Route path="patients/:patientId" element={<DoctorSingle />} />
  //           <Route path="patients/new" element={<DoctorNew />} /> */}
  //         </Routes>
  //       );
  //     case "patient":
  //       return (
  //         <Routes>
  //           {/* <Route path="/" element={<PatientHome />} />
  //           <Route path="appointments" element={<PatientList />} />
  //           <Route path="appointments/:appointmentId" element={<PatientSingle />} />
  //           <Route path="appointments/new" element={<PatientNew />} /> */}
  //         </Routes>
  //       );
  //     default:
  //       return <Login />; // Redirect to login if no role is set
  //   }
  // };

  // return (
  //   <div className={darkMode ? "app dark" : "app"}>
  //     <BrowserRouter>{renderRoutes()}</BrowserRouter>
  //   </div>
  // );
}

export default Scan;