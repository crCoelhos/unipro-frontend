import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import LoginPage from "./pages/Login/Login.tsx";
import HomePage from "./pages/Home/Home";

import Menu from "./components/Menu/Menu"
import React from 'react';
import { AuthProvider } from './contexts/authContext';
import EventDetails from './pages/EventDetails/EventDetails';
import SportEventPage from './pages/sportEventPage/sportEventPage'
import SignupPage from './pages/SignupPage/SignupPage';
import EventCatalogueFix from './components/eventCatalogueFix/eventCatalogueFix';
import AdminSection from './pages/AdminSection/AdminSection';
import AdminUserPage from './pages/AdminUserPage/AdminUserPage';
import CreateEventPage from './pages/CreateEventPage/CreateEventPage';
import CreateTicketPage from './pages/CreateTicketPage/CreateTicketPage';
import AdminEventPage from './pages/AdminEventPage/AdminEventPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import PublicationDetailsPage from './pages/PublicationDetailsPage/PublicationDetailsPage';
import InfoCardDetailsPage from './pages/InfoCardDetailsPage/InfoCardDetailsPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import DocAndBookingPage from './pages/DocAndBookingPage/DocAndBookingPage';
import AdminAthleticPage from './pages/AdminAthleticPage/AdminAthleticPage';

function App() {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* <Route path="/user-profile" element={<UserProfilePage />} /> */}

            <Route path="/home" element={<HomePage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/user-profile" element={<UserProfilePage />} />


            <Route path="/sport-events" element={<SportEventPage />} />
            {/* <Route path="/cultural-events" element={<CulturalEventPage />} /> */}

            {/* <Route exact path="/" element={<EventCatalogueFix />} /> */}
            <Route path="/sport-events/:eventId" element={<EventDetails />} />
            <Route path="/sport-events/:eventId/bookticket/:categoryId" element={<DocAndBookingPage />} />
            <Route path="/sport-events/buyticket/:categoryId" element={<PaymentPage />} />


            <Route path="/publication/:id" element={<PublicationDetailsPage />} />
            <Route path="/info-card/:id" element={<InfoCardDetailsPage />} />

            <Route exact path="/admin-area" element={<AdminSection />} />
            <Route path="/admin-area/events" element={<AdminEventPage />} />
            <Route path="/admin-area/athletics" element={<AdminAthleticPage />} />
            <Route path="/admin-area/events/:eventId" element={<EventDetails />} />
            <Route path="/admin-area/users" element={<AdminUserPage />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </PrimeReactProvider>
  );
}

export default App;
