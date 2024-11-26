import express from 'express';
import { addMovie, getMovies, getMovieById, addRandomMovie } from '../controllers/movieController.js';

const router = express.Router();

// Route to add a movie
router.post('/add', addMovie);

// Route to add a random movie
router.post('/add-random', addRandomMovie);  // <-- New route for random movie

// Route to get all movies
router.get('/', getMovies);

// Route to get a movie by ID
router.get('/:id', getMovieById);

export default router;
