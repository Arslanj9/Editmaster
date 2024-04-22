import React, { useState, useContext } from "react";
import { PDFContext } from "../contexts/pdfContext";
import { ImageContext } from "../contexts/imageContext";
import { UserLoggedInContext } from "../contexts/userLoggedInContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import "./Dashboard.css";

const Dashboard = ({ isAdmin }) => {
  // const [picture, setPicture] = useState(null);
  const navigate = useNavigate();
  const { handlePDFUpload } = useContext(PDFContext);
  const { handleImgUpload } = useContext(ImageContext);
  const { userLoggedIn, isLoggedIn } = useContext(UserLoggedInContext);


  const addPicture = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Convert File to URL
    handleImgUpload(imageUrl); 
    navigate("/imageViewer");
  };
  

  const addPDF = (e) => {
    const file = e.target.files[0];
    handlePDFUpload(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const pdfFile = reader.result;
      navigate("/pdfViewer", { state: { pdfFile } });
    };
    reader.readAsDataURL(file);
  };


  const handleViewAllUsers = () => {
    // Redirect to the "user-list" route
    navigate("/user-list");
  };





  return (
    <>
      <Header />
      {isLoggedIn ? (
        <div className="dashboard-container">
          <h2>Welcome to the Dashboard!</h2>

          <div className="upload-section">
            <div className="d-flex" style={{height: '140px'}}>
              
              {/* Upload picture for edit */}
              <div style={{width: "280px"}} className="upload-picture border border-3 border-opacity-50 border-primary rounded mt-5 p-2 m-auto d-flex flex-column align-items-center">
                <p className="upload-text" style={{ fontSize: "18px" }}>Edit Picture</p>
                <input style={{ width: "200px", height: "40px", fontSize: "14px" }} type="file" accept="image/*" onChange={addPicture} />
                {/* {picture && <p>Picture uploaded: {picture.name}</p>} */}
              </div>
              {/* Upload PDF for edit */}
              <div style={{width: "280px"}} className="upload-picture border border-3 border-opacity-50 border-primary rounded mt-5 p-2 m-auto d-flex flex-column align-items-center">
                <p className="upload-text" style={{fontSize: "18px"}}>Edit PDF</p>
                <input style={{ width: "200px", height: "40px", fontSize: "14px" }} type="file" accept=".pdf" onChange={addPDF} />
                {/* {pdf && <p>PDF uploaded: {pdf.name}</p>} */}
              </div>

            </div>
          </div>


          <div className="upload-section">

            <div className="d-flex">

              {/* Upload picture for Conversion */}
              <div style={{width: "280px"}} className="upload-picture border border-3 border-opacity-50 border-primary rounded mt-5 p-2 m-auto d-flex flex-column align-items-center">
                <p className="upload-text" style={{ fontSize: "18px" }}>Picture to PDF</p>
                <input style={{ width: "200px", height: "40px", fontSize: "14px" }} type="file" accept="image/*" onChange={addPicture} />
                {/* {picture && <p>Picture uploaded: {picture.name}</p>} */}
              </div>
              {/* Upload PDF for Conversion */}
              <div style={{width: "280px"}} className="upload-picture border border-3 border-opacity-50 border-primary rounded mt-5 p-2 m-auto d-flex flex-column align-items-center">
                <p className="upload-text" style={{fontSize: "18px"}}>PDF to Picture</p>
                <input style={{ width: "200px", height: "40px", fontSize: "14px" }} type="file" accept=".pdf" onChange={addPDF} />
                {/* {pdf && <p>PDF uploaded: {pdf.name}</p>} */}
              </div>

            </div>

          </div>

          {/* Conditional rendering for the admin button */}
          {isAdmin && (
            <div className="admin-section border border-3 border-opacity-50 border-primary rounded">
              <h4>Welcome Admin</h4>
              <button className="rounded py-1 px-2" style={{fontSize: "16px"}} onClick={handleViewAllUsers}>
                View All Users
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="container w-100 text-center">
          <h2 style={{marginTop: "100px"}}>Please login or register</h2>
        </div>
      )}
    </>
  );
};

export default Dashboard;
