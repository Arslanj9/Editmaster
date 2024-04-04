import React, { useState } from 'react'


const Profile = () => {

    const [userName, setUserName] = useState("User1")
    const [userEmail, setUserEmail] = useState("user@gmail.com")

  return (
    <>
        <div className='w-50 mx-auto mt-5'>
            <div className='d-flex align-items-center'>
                <h4 style={{marginRight: "10px;", marginTop: "10px"}}>Name:</h4>
                <input type="text" className='ms-4' disabled placeholder={userName} />
            </div>
            <div className='d-flex align-items-center mt-2'>
                <h4 style={{marginRight: "10px;", marginTop: "10px"}}>Email:</h4>
                <input type="text" className='ms-4' disabled placeholder={userEmail} />
            </div>
            <div class="form-check mt-3 mx-auto w-50">
                <input className="form-check-input " type="checkbox" value="" id="flexCheckDefault" checked disabled />
                <label className="form-check-label " for="flexCheckDefault">
                    Send Notifications
                </label>
            </div>

            {/* Button */}
            <div className="row justify-content-end">
                <div className="col-auto">
                    <button className="btn btn-primary ">Button 1</button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-secondary">Button 2</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile