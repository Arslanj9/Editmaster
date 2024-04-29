import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory for redirection

const EditProfileModal = () => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); 

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/auth/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newName,
          newEmail,
        }),
      });
      const data = await response.json();
      console.log(data);
      setSuccessMessage(data.message); // Set success message from response data

      // Logout and redirect after 3 seconds
      setTimeout(() => {
        localStorage.removeItem("token"); // Remove token from localStorage
        navigate("/login"); // Redirect to login page
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Add logic to show error message to the user
    }
  };

  return (
    <>
      <div className="me-2">
        <button
          type="button"
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#editProfileModal"
        >
          Edit Profile
        </button>

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
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
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
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                {/* Display success message */}
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirm}
                >
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
