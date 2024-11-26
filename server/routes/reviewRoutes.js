import express from 'express';

const router = express.Router();

// Example review routes
router.get('/', (req, res) => {
    res.json({ message: 'Fetching all reviews!' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Adding a new review!' });
});

export default router; // Ensure this is a default export
