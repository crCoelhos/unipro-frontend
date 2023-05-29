import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import IndexPage from "./pages/Index/Index"
import LoginPage from "./pages/Login/Login.tsx";
import HomePage from "./pages/Home/Home";
import PasswordRecoveryPage from "./pages/PasswordRecovery/PasswordRecovery"

import ContactUsPage from "./pages/ContactUs/ContactUs"
import Menu from "./components/Menu/Menu"
import React from 'react';
import { AuthProvider } from './contexts/authContext';
import EventDetailsPage from './pages/eventDetailsPage/eventDetailsPage';
import CulturalEventPage from './pages/culturalEventPage/culturalEventPage'
import SportEventPage from './pages/sportEventPage/sportEventPage'
import SignupPage from './components/SignupPage/SignupPage';


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
          <Route path="/contact-us" element={<ContactUsPage />} />

          <Route path="/sport-events" element={<SportEventPage />} />
          <Route path="/cultural-events" element={<CulturalEventPage />} />
          <Route path="/cultural-events/:id" element={<EventDetailsPage />} />

          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
