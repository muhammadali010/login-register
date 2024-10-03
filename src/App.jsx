import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Details from './pages/Details'
import MainLayout from './layout/MainLayout'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  function PrivateRoute({ Auth, children }) {
    if (!Auth) {
      navigate('/login');
    }
    return children;
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<PrivateRoute Auth={!!token}><MainLayout><Home></Home></MainLayout></PrivateRoute>}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/products/:id'
          element={<PrivateRoute Auth={!!token}><MainLayout><Details></Details></MainLayout></PrivateRoute>}
        />
      </Routes>
    </>
  );
}

export default App;
