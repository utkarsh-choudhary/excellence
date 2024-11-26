import React from 'react';
import { useAPI } from '../contexts/APIContext';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const { movies, loading, error } = useAPI();

    // Handling the loading and error states
    if (loading) {
        return <p className="text-center text-lg text-gray-500">Loading movies...</p>;
    }
    if (error) {
        return <p className="text-center text-lg text-red-500">Error: {error}</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mapping over movies */}
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div
                            key={movie._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
                        >
                            <Link to={`/movies/${movie._id}`}>
                                <img
                                    src={movie.posterImage || 'https://via.placeholder.com/150'}
                                    alt={movie.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold">{movie.title}</h2>
                                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                        {movie.description}
                                    </p>
                                    <p className="text-blue-500 mt-2 text-sm font-medium">
                                        View Details →
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-500">No movies available</p>
                )}
            </div>
        </div>
    );
};

export default MovieList;
