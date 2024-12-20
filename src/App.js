import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from "./pages/home/Home";
import ForgetPassword from "./pages/auth/ForgetPassword";
import MainLayout from './pages/components/layouts/MainLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import Chat from "./pages/chat/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';

function App() {
  const [user] = useAuthState(auth);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <MainLayout><Home /></MainLayout> : <Navigate to="/login" />} />
          <Route path="/chat/:uid" element={user ? <MainLayout><Chat /></MainLayout> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
