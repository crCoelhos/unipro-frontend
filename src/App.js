import { BrowserRouter, Routes, Route } from 'react-router-dom';

import IndexPage from "./pages/Index/Index"
import LoginPage from "./pages/Login/Login.tsx";
import HomePage from "./pages/Home/Home";
import PasswordRecoveryPage from "./pages/PasswordRecovery/PasswordRecovery"
import ProfilePage from "./pages/Profile/Profile"
import MemberCardPage from "./pages/MemberCard/MemberCard"
import ContactUsPage from "./pages/ContactUs/ContactUs"
import Menu from "./components/Menu/Menu"
import UploadPic from "./pages/UploadPic/uploadPic"
import React from 'react';
import { AuthProvider } from './contexts/authContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/index" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/member-card" element={<MemberCardPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/upload-pic" element={<UploadPic />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
