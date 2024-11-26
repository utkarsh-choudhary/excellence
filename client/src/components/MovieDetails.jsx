import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../lib/axiosInstance';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await axios.get(`/movies/${id}`);
                setMovie(response.data.movie);
            } catch (err) {
                setError(err.message || "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetail();
    }, [id]);

    if (loading) {
        return <p className="text-center text-lg text-gray-500">Loading movie details...</p>;
    }
    if (error) {
        return <p className="text-center text-lg text-red-500">Error: {error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <img
                    src={movie.posterImage || 'https://via.placeholder.com/150'}
                    alt={movie.title}
                    className="w-full h-96 object-cover rounded-lg"
                />
                <div className="mt-6">
                    <h1 className="text-2xl font-bold">{movie.title}</h1>
                    <p className="text-gray-600 mt-4">{movie.description}</p>
                    <div className="mt-4 flex flex-wrap gap-4">
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold">Release Date:</span> {new Date(movie.releaseDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold">Rating:</span> {movie.rating}
                        </p>
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold">Duration:</span> {movie.duration} mins
                        </p>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Genres</h2>
                        <ul className="flex flex-wrap gap-2 mt-2">
                            {movie.genres.map((genre, index) => (
                                <li
                                    key={index}
                                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                                >
                                    {genre}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Actors</h2>
                        <ul className="flex flex-wrap gap-2 mt-2">
                            {movie.actors.map((actor, index) => (
                                <li
                                    key={index}
                                    className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm"
                                >
                                    {actor}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
