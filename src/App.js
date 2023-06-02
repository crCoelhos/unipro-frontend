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
import EventDetails from './pages/EventDetails/EventDetails';
import CulturalEventPage from './pages/culturalEventPage/culturalEventPage'
import SportEventPage from './pages/sportEventPage/sportEventPage'
import SignupPage from './components/SignupPage/SignupPage';
import EventCatalogueFix from './components/eventCatalogueFix/eventCatalogueFix';
import AdminSection from './pages/AdminSection/AdminSection';
import AdminUserPage from './pages/AdminUserPage/AdminUserPage';
import HandSidebar from './components/HandSidebar/HandSidebar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/index" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />

          <Route path="/sport-events" element={<SportEventPage />} />
          <Route path="/cultural-events" element={<CulturalEventPage />} />

          <Route exact path="/" element={<EventCatalogueFix />} />
          <Route path="/sport-events/:eventId" element={<EventDetails />} />

          <Route path="/signup" element={<SignupPage />} />


          {/* 
          <Routes> */}
          <Route exact path="/admin-area" element={<AdminSection />} />
          <Route path="/admin-area/sport-events" element={<SportEventPage />} />
          <Route path="/admin-area/users" element={<AdminUserPage />} />
          {/* <Route path="/admin-area/contact" element={<Contact />} /> */}
          {/* </Routes> */}

          {/* <Route path="/admin-area" element={<AdminSection />} /> */}

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
