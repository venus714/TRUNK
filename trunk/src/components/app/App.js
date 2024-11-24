import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Home from '../home/Home';
import About from '../about/About';
import Login from '../login/Login';
import Footer from '../footer/Footer';
import Signup from '../signup/Sighnup'; // Fixed the typo here
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(false);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const handleLogin = (event) => {
    event.preventDefault();

    // Replace 'YOUR_API_URL' with your actual login API endpoint
    axios
      .post('YOUR_API_URL', {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        if (res.status === 202) {
          const { jwt, user } = res.data;

          localStorage.setItem('token', jwt);
          localStorage.setItem('user_id', user.id);
          localStorage.setItem('admin', user.admin);

          setUserId(user.id);
          setAdmin(user.admin);
          setIsAuthenticated(true);

          // Redirect user after successful login using useNavigate
          navigate('/');
          console.log('Successfully logged in');
        } else {
          alert('Failed to Login');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError(error.response.data.error || 'Invalid credentials.');
        } else {
          setError('An error occurred. Please try again later.');
        }
        console.error(error);
      });
  };

  return (
    <div className="App">
      <Navbar
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        setAdmin={setAdmin}
      />
      <Routes>
        <Route
          path="/"
          element={<Home setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} admin={admin} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            <Login
              error={error}
              setIsAuthenticated={setIsAuthenticated}
              setValues={setValues}
              values={values}
              handleLogin={handleLogin}
            />
          }
        />
        <Route path="/signup" element={<Signup setError={setError} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
