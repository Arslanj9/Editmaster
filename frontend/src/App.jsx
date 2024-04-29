import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Register from './components/Auth/RegistrationForm';
import LoginForm from './components/Auth/LoginForm';
import SocialLogin from './components/Auth/SocialLogin';
import Dashboard from './pages/Dashboard';
import PdfViewer from './pages/PdfViewer';
import PDFProvider from './contexts/pdfContext'
import ImageViewer from './pages/ImageViewer';
import ImageProvider from './contexts/imageContext'
import UserList from './pages/UserList';
import UserLoggedInProvider from './contexts/userLoggedInContext'
import './App.css'
import Profile from './pages/Profile';
import UserDataProvider from './contexts/userDataContext';
import ResetPassword from './components/Auth/ResetPassword'
import ForgotPassword from './components/Auth/ForgotPassword';

function App() {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    <>
      <PDFProvider>
        <ImageProvider>
          <UserLoggedInProvider>
            <UserDataProvider>
              <Router>
                <Routes>
        
                  <Route path='/' element={<Home />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/socialLogin' element={<SocialLogin />} />
                  <Route path='/login' element={<LoginForm setUser={setUser} />} />
                  <Route path='/dashboard' element={<Dashboard user={user} />} />
                  <Route path='/pdfViewer' element={<PdfViewer />} />
                  <Route path='/imageViewer' element={<ImageViewer />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/reset-password/:token' element={<ResetPassword />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />

                  {/* ---- Additional routes for admin and user roles ---- */}
                  <Route path='/dashboard/admin' element={<Dashboard user={user} isAdmin={true} />} />
                  <Route path='/dashboard/user' element={<Dashboard user={user} isAdmin={false} />} />
                  <Route path='/user-list' element={<UserList />} />
        
                </Routes>
              </Router>
              </UserDataProvider>
          </UserLoggedInProvider>      
        </ImageProvider>
      </PDFProvider>      
    </>
  );
}

export default App;
