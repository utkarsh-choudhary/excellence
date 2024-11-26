import Movie from '../models/Movie.js';
import { faker } from '@faker-js/faker';


// Function to generate random movie data
const generateRandomMovie = () => {
    const title = faker.lorem.words(3);
    const description = faker.lorem.paragraph();
    const releaseDate = faker.date.past(5);
    const rating = parseFloat(faker.random.number({ min: 1, max: 10, precision: 0.1 }).toFixed(1));
    const duration = faker.random.number({ min: 60, max: 180 });
    const posterImage = faker.image.imageUrl(640, 480, 'movies');
    const genres = ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi'];
    const actors = ['Tom Cruise', 'Scarlett Johansson', 'Will Smith', 'Ryan Reynolds'];

    const selectedGenres = [faker.random.arrayElement(genres)];
    const selectedActors = faker.random.arrayElements(actors, 3);

    return {
        title,
        description,
        releaseDate,
        rating,
        duration,
        posterImage,
        genres: selectedGenres,
        actors: selectedActors,
    };
};

// Add a movie
export const addMovie = async (req, res) => {
    const { title, description, releaseDate, rating, duration, posterImage, genres, actors } = req.body;

    try {
        const movie = await Movie.create({
            title,
            description,
            releaseDate,
            rating,
            duration,
            posterImage,
            genres,
            actors,
        });

        res.status(201).json({ message: 'Movie added successfully', movie });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Add random movie
export const addRandomMovie = async (req, res) => {
    const movieData = generateRandomMovie();

    try {
        const movie = await Movie.create(movieData);
        res.status(201).json({ message: 'Random movie added successfully', movie });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Get all movies
export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate('genres actors');
        res.status(200).json({ movies });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id).populate('genres actors');
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        res.status(200).json({ movie });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
