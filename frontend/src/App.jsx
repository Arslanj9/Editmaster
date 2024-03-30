import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Register from './components/Auth/RegistrationForm';
import LoginForm from './components/Auth/LoginForm';
import SocialLogin from './components/Auth/SocialLogin';
import Dashboard from './pages/Dashboard';
import PdfViewer from './pdf/PdfViewer';
import UserList from './pages/UserList';
import './App.css'

function App() {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/socialLogin' element={<SocialLogin />} />
          <Route
            path='/login'
            element={<LoginForm setUser={setUser} />}
          />
          <Route
            path='/dashboard'
            element={<Dashboard user={user} />}
          />
          <Route path='/pdfViewer' element={<PdfViewer />} />
          
          {/* Additional routes for admin and user roles */}
          <Route
            path='/dashboard/admin'
            element={<Dashboard user={user} isAdmin={true} />}
          />
          <Route
            path='/dashboard/user'
            element={<Dashboard user={user} isAdmin={false} />}
          />
          <Route
            path='/user-list'
            element={<UserList />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
