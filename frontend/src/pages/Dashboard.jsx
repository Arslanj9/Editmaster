import React, { useState, useContext } from 'react';
import { PDFContext } from '../contexts/pdfContext'
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import './Dashboard.css'; 

const Dashboard = ({ user, isAdmin }) => {

  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();

  const addPicture = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };


  const {handlePDFUpload} = useContext(PDFContext)

  const addPDF = (e) => {
    const file = e.target.files[0];
    handlePDFUpload(file);


    const reader = new FileReader();
    reader.onloadend = () => {
      const pdfFile = reader.result;
      navigate('/pdfViewer', { state: { pdfFile } });
    };
    reader.readAsDataURL(file);
  };


  const handleViewAllUsers = () => {
    // Redirect to the "user-list" route
    navigate('/user-list');
  };

  
  return (
    <>
    <Header />
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard!</h2>

      <div className="upload-section">
        <div className='upload-picture'>
          <h3>Upload Picture</h3>
          <input type="file" accept="image/*" onChange={addPicture} />
          {picture && <p>Picture uploaded: {picture.name}</p>}
        </div>

        <div className='upload-pdf'>
          <h3>Upload PDF</h3>
          <input type="file" accept=".pdf" onChange={addPDF} />
          {/* {pdf && <p>PDF uploaded: {pdf.name}</p>} */}
        </div>
      </div>

      {/* Conditional rendering for the admin button */}
      {isAdmin && (
        <div className="admin-section">
          <h2>Welcome Admin</h2>
          <button className="view-users-btn" onClick={handleViewAllUsers}>
            View All Users
          </button>
        </div>
      )}
    </div>
  </>
  );
};

export default Dashboard;
