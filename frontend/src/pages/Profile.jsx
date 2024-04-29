import React, { useState, useContext, useEffect } from "react";
import { UserDataContext } from "../contexts/userDataContext";
// import ForgotPasswordModal from "../components/Auth/ForgotPasswordModal";
import EditProfileModal from "./Profile/EditProfileModal";

const Profile = () => {

  const [userData, setUserData] = useState("");

  const {} = useContext(UserDataContext)
  


  // Getting userdata from cookies
    useEffect(() => {
        // Check if user data exists in cookies on component mount
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const userDataCookie = cookies.find(cookie => cookie.startsWith('userData='));
        if (userDataCookie) {
          const userDataStr = userDataCookie.split('=')[1];
          setUserData(JSON.parse(userDataStr));
          
        }
      }, []);





  return (
    <>
      <div className="w-50 mx-auto mt-5">
        <div className="d-flex align-items-center">
          <h4 style={{ marginRight: "10px", marginTop: "10px" }}>Name:</h4>
          <input type="text" className="ms-4" disabled placeholder={userData.name} />
        </div>
        <div className="d-flex align-items-center mt-2">
          <h4 style={{ marginRight: "10px", marginTop: "10px" }}>Email:</h4>
          <input type="text" className="ms-4" disabled placeholder={userData.email} />
        </div>
        <div className="form-check mt-3 mx-auto w-50">
          <input
            className="form-check-input "
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked
            disabled
          />
          <label className="form-check-label " htmlFor="flexCheckDefault">
            Send Notifications
          </label>
        </div>




        {/* Buttons */}
        <div className="d-flex justify-content-end mt-4">
          <EditProfileModal />
          
        </div>
      </div>
    </>
  );
};

export default Profile;
