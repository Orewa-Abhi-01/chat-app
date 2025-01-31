import { useState } from "react";

import Navbar from "./components/Navbar";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import useAuthStore from "./store/useAuthStore";

import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import NotificationSection from "./components/NotificationSection";
// import Sidebar from "./components/Sidebar";

// import useChatStore from "./store/useChatStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  console.log({ onlineUsers });
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();

  // const {getMessages} = useChatStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser && location.pathname === "/login") {
      navigate("/");
      setJustLoggedIn(true);
      console.log(justLoggedIn);
    }
  }, [authUser, navigate, location.pathname, justLoggedIn]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-bold">Loading...</p>
        <Loader className="size-16 animate-spin" />
      </div>
    );
  }

  const showNavbar =
    // location.pathname !== "/" &&
    location.pathname !== "/settings" &&
    location.pathname !== "/profile" &&
    location.pathname !== "/notifications";

  return (
    <div data-theme={theme}>
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />{" "}
        <Route
          path="/notifications"
          element={authUser && <NotificationSection />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
