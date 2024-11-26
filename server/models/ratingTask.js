// /models/ratingTask.js
import mongoose from 'mongoose';

const ratingTaskSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', // Assuming a Task model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a User model
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Assuming a 1-5 star rating system
    },
    review: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const RatingTask = mongoose.model('RatingTask', ratingTaskSchema);

// Export functions that can be used in the controller
export const addRating = async (taskId, userId, rating, review) => {
    try {
        const existingRating = await TaskRating.findOne({ taskId, userId });
        if (existingRating) throw new Error('You have already rated this task');

        const newRating = new TaskRating({ taskId, userId, rating, review });
        await newRating.save();
        return { success: true, message: 'Rating added successfully', rating: newRating };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getTaskRatings = async (taskId) => {
    try {
        const ratings = await RatingTask.find({ taskId });
        return ratings;
    } catch (error) {
        throw new Error('Failed to get ratings: ' + error.message);
    }
};

export const getAverageRating = async (taskId) => {
    try {
        const ratings = await RatingTask.aggregate([
            { $match: { taskId } },
            { $group: { _id: null, averageRating: { $avg: '$rating' } } },
        ]);
        return ratings.length > 0 ? ratings[0].averageRating : 0;
    } catch (error) {
        throw new Error('Failed to get average rating: ' + error.message);
    }
};

export default RatingTask;
