// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/NavBar.jsx';
import FooterComponent from './components/common/Footer';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import LoginAuthenticationPage from './components/auth/LoginAuthentication';
import HomePage from './components/home/HomePage';
import AllRoomsPage from './components/booking/AllRoomsPage';
import RoomDetailsBookingPage from './components/booking/RoomDetailsPage';
import FindBookingPage from './components/booking/FindBookingPage';
import AdminPage from './components/admin/AdminPage';
import ManageRoomPage from './components/admin/ManageRoomPage';
import EditRoomPage from './components/admin/EditRoomPage';
import AddRoomPage from './components/admin/AddRoomPage';
import ManageBookingsPage from './components/admin/ManageBookingsPage';
import EditBookingPage from './components/admin/EditBookingPage';
import ProfilePage from './components/profile/ProfilePage';
import EditProfilePage from './components/profile/EditProfilePage';
import CardPaymentForm from './components/payment/CardPaymentForm.jsx';

import { ProtectedRoute, AdminRoute } from './service/guard';
import { Toaster } from 'sonner';
import YapePayment from "./components/payment/YapePayment.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/cardPayment" element={<CardPaymentForm />} />
            <Route path="/yapePayment" element={<YapePayment />} />

            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/rooms" element={<AllRoomsPage />} />
            <Route path="/find-booking" element={<FindBookingPage />} />
            <Route
              path="/login-authentication"
              element={<LoginAuthenticationPage />}
            />

            {/* Protected Routes */}
            <Route
              path="/room-details-book/:roomId"
              element={<ProtectedRoute element={<RoomDetailsBookingPage />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            />
            <Route
              path="/edit-profile"
              element={<ProtectedRoute element={<EditProfilePage />} />}
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
            />
            <Route
              path="/admin/manage-rooms"
              element={<AdminRoute element={<ManageRoomPage />} />}
            />
            <Route
              path="/admin/edit-room/:roomId"
              element={<AdminRoute element={<EditRoomPage />} />}
            />
            <Route
              path="/admin/add-room"
              element={<AdminRoute element={<AddRoomPage />} />}
            />
            <Route
              path="/admin/manage-bookings"
              element={<AdminRoute element={<ManageBookingsPage />} />}
            />
            <Route
              path="/admin/edit-booking/:bookingCode"
              element={<AdminRoute element={<EditBookingPage />} />}
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <FooterComponent />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
