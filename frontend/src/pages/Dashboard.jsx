import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

const Dashboard = ({ user, isAdmin }) => {
  const [picture, setPicture] = useState(null);
  const [pdf, setPdf] = useState(null);
  const navigate = useNavigate();

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    setPdf(file);

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
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard!</h2>

      <div className="upload-section">
        <div className='upload-picture'>
          <h3>Uploa Picture</h3>
          <input type="file" accept="image/*" onChange={handlePictureUpload} />
          {picture && <p>Picture uploaded: {picture.name}</p>}
        </div>

        <div className='upload-pdf'>
          <h3>Upload PDF</h3>
          <input type="file" accept=".pdf" onChange={handlePdfUpload} />
          {pdf && <p>PDF uploaded: {pdf.name}</p>}
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
  );
};

export default Dashboard;
