import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInScreen from "./features/Auth/screens/SignInScreen";
import GuestRoute from "./general/components/AppRoutes/GuestRoute";
import PrivateRoute from "./general/components/AppRoutes/PrivateRoute";
import SignUpScreen from "./features/Auth/screens/SignUpScreen";
import "react-toastify/dist/ReactToastify.css";

//load bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense, useEffect } from 'react';
import HomeScreen from './features/LandingPage/Screens/HomeScreen';
import AppNotFound from './general/components/AppNotFound';
import AppToast from './general/components/AppToast';
import Dashboard from './features/Dashboard';
import Account from './features/Account';
import Admin from './Admin';
import AccountListener from './features/Account/AccountListener';
import ForgotPasswordScreen from './features/Auth/screens/ForgotPassScreen';
import ResetPasswordScreen from './features/Auth/screens/ResetPassScreen';
import ImageDetailScreen from './features/IgameDetailScreen';
import Upload from './features/Upload';

require("bootstrap/dist/js/bootstrap.min");
// Load KT plugins
// require("../src/assets/plugins/ktutil");
// require("../src/assets/plugins/ktmenu");
// require("../src/assets/plugins/ktoffcanvas");
// require("../src/assets/plugins/ktcookie");
// require("../src/assets/plugins/kttoggle");
// // aside
// require("../src/assets/plugins/aside/aside");
// require("../src/assets/plugins/aside/aside-menu");
// require("../src/assets/plugins/aside/aside-toggle");
// // header
// require("../src/assets/plugins/header/ktheader-mobile");
// require("../src/assets/plugins/header/ktheader-topbar");

const sTag = "[App]";

function App() {
  // MARK: --- Hooks ---
  useEffect(() => {
    console.log(`${sTag} did load`);

    return () => {
      console.log(`${sTag} will dismiss`);
    };
  }, []);

  return (
    <>
      {/* Router */}
      <Router>
        {/* Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Landing Page */}
            <Route path="" element={<HomeScreen />} />
            {/* Dashboard */}
            <Route
              path="dashboard/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="account/*"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
            <Route
              path="admin/*"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            
            
            {/* Account */}
            <Route
              path="/pin*"
              element={
                <PrivateRoute>
                  <ImageDetailScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <Upload />
                </PrivateRoute>
              }
            />
            <Route
              path="/sign-in"
              element={
                <GuestRoute>
                  <SignInScreen />
                </GuestRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <GuestRoute>
                  <SignUpScreen />
                </GuestRoute>
              }
            />
            <Route
              path="/forgot-pass"
              element={
                <GuestRoute>
                  <ForgotPasswordScreen />
                </GuestRoute>
              }
            />
            <Route
              path="/reset-pass"
              element={
                <GuestRoute>
                  <ResetPasswordScreen />
                </GuestRoute>
              }
            />

            {/* Not Found */}
            <Route path="*" element={<AppNotFound />} />
          </Routes>
        </Suspense>
      </Router>

      {/* App Dialog */}
      {/* <AppDialog /> */}
      {/* Toast */}
      <AppToast />
      {/* Listener */}
      {/* <DataCommonListener /> */}
      {/* Account Listener */}
      <AccountListener />
    </>
  );
}

export default App;
