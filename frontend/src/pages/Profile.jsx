import React, { useState } from "react";

const Profile = () => {
  const [userName, setUserName] = useState("User1");
  const [userEmail, setUserEmail] = useState("user@gmail.com");

  return (
    <>
      <div className="w-50 mx-auto mt-5">
        <div className="d-flex align-items-center">
          <h4 style={{ marginRight: "10px;", marginTop: "10px" }}>Name:</h4>
          <input type="text" className="ms-4" disabled placeholder={userName} />
        </div>
        <div className="d-flex align-items-center mt-2">
          <h4 style={{ marginRight: "10px;", marginTop: "10px" }}>Email:</h4>
          <input type="text" className="ms-4" disabled placeholder={userEmail} />
        </div>
        <div class="form-check mt-3 mx-auto w-50">
          <input
            className="form-check-input "
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked
            disabled
          />
          <label className="form-check-label " for="flexCheckDefault">
            Send Notifications
          </label>
        </div>

        {/* Buttons */}
        {/* <div className='d-flex justify-content-end mt-4'>
            <button style={{ marginRight: '10px' }} className="btn btn-outline-primary ">Edit Profile</button>
            <button className="btn btn-outline-primary">Reset Password</button>
        </div> */}





        <div className="d-flex justify-content-end mt-4">
          <div className="me-2">
            {/* ========================
                 Button 1 trigger modal 
                 ======================
            */}
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Edit Profile
            </button>

            {/* Modal for Edit Profile */}
            <div
              className="modal fade"
              id="editProfileModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Edit Profile
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex align-items-center" style={{marginTop: "-20px"}}>
                      <p style={{ marginRight: "10px;", marginTop: "20px" }}>Name:</p>
                      <input type="text" className="ms-4 h-100" placeholder="New Name" />
                    </div>
                    <div className="d-flex align-items-center" style={{marginTop: "-15px"}}>
                      <p style={{ marginRight: "10px;", marginTop: "20px" }}>Email:</p>
                      <input type="text" className="ms-4 h-100" placeholder="New Email" />
                    </div>
                    <div class="form-check mt-3 mx-auto w-50">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked
                      />
                      <label className="form-check-label " for="flexCheckDefault">
                        Send Notifications
                      </label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary">
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
           {/* ========================
                 Button 2 trigger modal 
                 ======================
            */}
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#resetPasswordModal"
            >
              Reset Password
            </button>

            {/* Modal for reset password */}
            <div
              className="modal fade"
              id="resetPasswordModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Reset Password
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">

                      <p style={{ marginTop: "10px", fontSize: "18px", marginBottom: "0px" }}>New Password:</p>
                      <input type="password" style={{fontSize: "18px"}} className="h-100 mb-0" placeholder="Enter New Password" />
                    
                      <p style={{ marginRight: "10px;", marginTop: "20px", fontSize: "18px", marginBottom: "0px"  }}>Confirm New Password:</p>
                      <input type="password" style={{fontSize: "18px"}} className=" h-100" placeholder="Confirm New Password" />

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary">
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
