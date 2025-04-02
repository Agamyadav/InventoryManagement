import React, { useEffect } from 'react'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Product from './pages/Product'
import { Route, Routes } from 'react-router-dom'
import { getCurrentUser } from './Services/authService'

function App() {
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getCurrentUser();
      if (response?.statusCode === 200) {
        localStorage.setItem("userData", JSON.stringify(response?.data));
        localStorage.setItem("status", true);
        window.location.reload();
      }
      else{
        localStorage.setItem("status", false);
      }
    }
    fetchUser();
  }, []);
  const status = localStorage.getItem("status");
  return (
      <Routes>
          <Route path="/" element={
            status ? <Home /> : <Landing />
          } />
          <Route path="*" element={<h1>Not Found</h1>} />
          

      </Routes>
  )
}

export default App