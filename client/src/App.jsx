import './App.css';
import LogIn from './components/LogIn';
import Register from './components/Register';
import User from './components/User';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForgetPassword from './components/ForgetPassword';
import PasswordReset from './components/PasswordReset';


function App() {

  function RequireAuth({ children }) {
    return localStorage.getItem("token") ? (
      children
    ) : (
      <Navigate to='/' />
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/forgotpassword/:id/:token" element={<ForgetPassword />} />
          <Route path="/user" element={<RequireAuth>
            <User />
          </RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
