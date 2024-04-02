import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    const [userLogin, setUserLogin] = useState(true) 


  return (
    <>
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                
                <Link to="/" className='text-decoration-none'>
                    <h4 className='mt-1 mb-0 fw-bold text-primary'>Editmaster</h4>  
                </Link>
                
                    {
                        userLogin ? 
                        <div className="col-md-3 text-end">
                            <Link to="/" style={{height: "44px"}} className="btn btn-outline-primary pt-1 me-2">Logout</Link>
                            <Link to="/profile" style={{height: "44px"}} className="btn btn-primary pt-1">Profile</Link>
                        </div> : 
                        <div className="col-md-3 text-end">
                            <Link to="/login" style={{height: "44px"}} className="btn btn-outline-primary pt-1 me-2">Login</Link>
                            <Link to="/register" style={{height: "44px"}} className="btn btn-primary pt-1">Register</Link>
                        </div>
                    }
                    

            </header>
        </div>
    </>
  )
}

export default Header