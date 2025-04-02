import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Product from './pages/Product';
import { getCurrentUser } from './Services/authService';

function App() {
  const [status, setStatus] = useState(localStorage.getItem("status") === "true");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getCurrentUser();
      if (response?.statusCode === 200) {
        localStorage.setItem("userData", JSON.stringify(response?.data));
        localStorage.setItem("status", "true");
        setStatus(true); // Update state
      }
    };
    fetchUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={status ? <Home /> : <Landing />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
