import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../download.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
const Navbar = () => {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let token = null;
    if (profile) {
      token = profile.token;
    }
    setProfile(JSON.parse(localStorage.getItem("profile")));
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
  }, [location]);

  async function handleLogout(e) {
    // e.preventDefault();
    setProfile(null);
    localStorage.removeItem("profile");
    navigate("/login");
  }
  return (
    <div className="Navbar">
      <Link to="/">
        <img src={logo} alt="" srcset="" className="logo" />
      </Link>
      <p>Expense Management</p>
      <p className="User">{!profile ? "" : profile.user.name}</p>
      {profile && (
        <button className="User logoutbtn" onClick={handleLogout}>
          Logout
        </button>
      )}
      {!profile && (
        <Link to="login">
          <button className="User loginbtn">Login</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
