import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { APIProvider } from './contexts/APIContext';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import Login from './components/Login';
import Register from './components/Register';
import MovieDetail from './components/MovieDetails';
import Home from './components/Home';

const App = () => {
    return (
        <APIProvider>
            <Router>
                <ConditionalNavbar />
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/movies/:id" element={<MovieDetail />} />
                    <Route path="/home" element={<Home />} />
                    {/* Add more routes as needed */}
                </Routes>
            </Router>
        </APIProvider>
    );
};

// A component to conditionally render the Navbar
const ConditionalNavbar = () => {
    const location = useLocation();

    // Define routes where the Navbar should be hidden
    const noNavbarRoutes = ['/login', '/register'];

    return !noNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
};

export default App;
