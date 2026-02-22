import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Clipdrawer from '../Adcomponent/Clipdrawer';
import Dashboard from '../Adcomponent/Dashboard';
import Viewuser from '../Adcomponent/Viewuser';
import Addproduct from '../Adcomponent/Addproduct';
import ViewDeviceDetails from '../Adcomponent/ViewDeviceDetails';
import UpdateDeviceDetails from '../Adcomponent/UpdateDeviceDetails';
import AdminLogin from '../Adcomponent/Adminlogin';
import Vieworders from '../Adcomponent/Vieworders';
import ProtectedAdmin from './ProtectedAdmin';
import ManageDeliveryStatus from '../Adcomponent/ManageDeliveryStatus';

export default function Adminrouter() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isLoggedIn = localStorage.getItem("adminToken");

  return (
    <>
      {isLoggedIn && !isLoginPage && <Clipdrawer />}

      <Routes>
        {/* Redirect /admin → /admin/login */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />

        {/* Login page */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedAdmin>
              <Dashboard />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/viewuser"
          element={
            <ProtectedAdmin>
              <Viewuser />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/addevice"
          element={
            <ProtectedAdmin>
              <Addproduct />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/viewdevice"
          element={
            <ProtectedAdmin>
              <ViewDeviceDetails />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/updatedevice/:pid"
          element={
            <ProtectedAdmin>
              <UpdateDeviceDetails />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/vieworders/:deviceid"
          element={
            <ProtectedAdmin>
              <Vieworders />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/managedeliverystatus"
          element={
            <ProtectedAdmin>
              <ManageDeliveryStatus />
            </ProtectedAdmin>
          }
        />
      </Routes>
    </>
  );
}
