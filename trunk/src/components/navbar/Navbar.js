import React from 'react';
import { Link } from 'react-router-dom';
import '../navbar/Navbar.css';
import 'bootstrap/dist/css/bootstrap.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import logo from './courier.png';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const admin = localStorage.getItem("admin") === "true";

  const handleLogout = async () => {
    try {
      // Optionally send logout request to server if needed
      await axios.post('will put api', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Clear authentication data from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("admin");

      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          {/* <img className="logo" src={logo} alt="Deliveroo Logo" height="40" /> */}
          DELIVEROO
        </Link>
      </div>
      <ul>
        {!isAuthenticated ? (
          <>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/">HOME</Link>
              </li>
            </CSSTransition>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
            </CSSTransition>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
            </CSSTransition>
          </>
        ) : (
          <>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/">HOME</Link>
              </li>
            </CSSTransition>
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
            </CSSTransition>
            {admin && (
              <CSSTransition classNames="fade" timeout={300}>
                <li>
                  <Link to="/">ADMIN DASHBOARD</Link>
                </li>
              </CSSTransition>
            )}
            <CSSTransition classNames="fade" timeout={300}>
              <li>
                <Link onClick={handleLogout} to="/">
                  LOGOUT
                </Link>
              </li>
            </CSSTransition>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
