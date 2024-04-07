import React, { useContext } from 'react'
import { UserLoggedInContext } from '../../contexts/userLoggedInContext'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../../contexts/userDataContext'

const Header = () => {

    const { isLoggedIn, logout } = useContext(UserLoggedInContext)
    const { removeUserData } = useContext(UserDataContext)

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        logout()
        removeUserData()
    }



  return (
    <>
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                
                    <h4 className='mt-1 mb-0 fw-bold text-primary'>Editmaster</h4>  
                    {
                        isLoggedIn ? 
                        <div className="col-md-3 text-end">
                            <Link to="/" onClick={handleLogout} style={{height: "44px"}} className="btn btn-outline-primary pt-1 me-2">Logout</Link>
                            <Link to="/profile" style={{height: "44px"}} className="btn btn-outline-primary pt-1">Profile</Link>
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