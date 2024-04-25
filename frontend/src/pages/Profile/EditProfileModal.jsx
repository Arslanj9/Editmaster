import React from "react";

const EditProfileModal = () => {
  return (
    <>
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
                <div
                  className="d-flex align-items-center"
                  style={{ marginTop: "-20px" }}
                >
                  <p style={{ marginRight: "10px", marginTop: "20px" }}>
                    Name:
                  </p>
                  <input
                    type="text"
                    className="ms-4 h-100"
                    placeholder="New Name"
                  />
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ marginTop: "-15px" }}
                >
                  <p style={{ marginRight: "10px", marginTop: "20px" }}>
                    Email:
                  </p>
                  <input
                    type="text"
                    className="ms-4 h-100"
                    placeholder="New Email"
                  />
                </div>
                <div className="form-check mt-3 mx-auto w-50">
                  <input
                    className="form-check-input "
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    defaultChecked
                  />
                  <label
                    className="form-check-label "
                    htmlFor="flexCheckDefault"
                  >
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
    </>
  );
};

export default EditProfileModal;
