import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../lib/axiosInstance'; // Use the axios instance with auth token

const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/movies'); // Ensure this endpoint is correct
                setMovies(response.data.movies); // Adjust according to API response format
            } catch (err) {
                setError(err.message); // Capture error message
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    return (
        <APIContext.Provider value={{ movies, loading, error }}>
            {children}
        </APIContext.Provider>
    );
};

export const useAPI = () => {
    return useContext(APIContext);
};
