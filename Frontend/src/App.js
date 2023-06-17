import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./index.css";
function App() {
  return (
    <body>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home></Home>
              </ProtectedRoutes>
            }
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </body>
  );
}
export function ProtectedRoutes(props) {
  if (localStorage.getItem("profile")) {
    return props.children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}
export default App;
