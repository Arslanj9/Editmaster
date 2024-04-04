import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Register from './components/Auth/RegistrationForm';
import LoginForm from './components/Auth/LoginForm';
import SocialLogin from './components/Auth/SocialLogin';
import Dashboard from './pages/Dashboard';
import PdfViewer from './pages/PdfViewer';
import UserList from './pages/UserList';
import PDFProvider from './contexts/pdfContext'
import UserLoggedInProvider from './contexts/userLoggedInContext'
import './App.css'
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    <>
      <PDFProvider>
        <UserLoggedInProvider>
          <Router>
            <Routes>
    
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/socialLogin' element={<SocialLogin />} />
              <Route path='/login' element={<LoginForm setUser={setUser} />} />
              <Route path='/dashboard' element={<Dashboard user={user} />} />
              <Route path='/pdfViewer' element={<PdfViewer />} />
              <Route path='/profile' element={<Profile />} />

              {/* ---- Additional routes for admin and user roles ---- */}
              <Route path='/dashboard/admin' element={<Dashboard user={user} isAdmin={true} />} />
              <Route path='/dashboard/user' element={<Dashboard user={user} isAdmin={false} />} />
              <Route path='/user-list' element={<UserList />} />
    
            </Routes>
          </Router>
        </UserLoggedInProvider>      
      </PDFProvider>      
    </>
  );
}

export default App;
