import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    releaseDate: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    duration: { type: Number }, // Duration in minutes
    posterImage: { type: String },
    genres: [{ type: String }], // Array of genres
    actors: [{ type: String }], // Array of actor names
}, { timestamps: true });

export default mongoose.model('Movie', movieSchema);
