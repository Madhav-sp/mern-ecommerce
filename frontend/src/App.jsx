// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./pages/AppRoutes"; // 👈 Handles all routing
import { useDispatch } from "react-redux";
import { getUserProfile } from "./redux/user/userSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile()); // ✅ fetch user on reload using cookie
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Toaster />
      {/*position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#333",
            fontWeight: 500,
          },
        }} */}
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
