import React from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Statistics from "./Pages/Satistics/Statistics";

function App() {
  return (
    <div>
      <div className="w-screen h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<DashboardLayOut />}>
            <Route path="" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function DashboardLayOut() {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-80">
        <Navbar />
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
