import mongoose from 'mongoose';

// Task Rating Schema
const taskRatingSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task', // Assuming there is a Task model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there is a User model
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Task Rating Model
const TaskRating = mongoose.model('TaskRating', taskRatingSchema);

// Function to add a new rating to a task
const addRating = async (taskId, userId, rating, review) => {
  try {
    // Check if the user has already rated this task
    const existingRating = await TaskRating.findOne({ taskId, userId });

    if (existingRating) {
      throw new Error('You have already rated this task');
    }

    const newRating = new TaskRating({
      taskId,
      userId,
      rating,
      review
    });

    await newRating.save();
    return { success: true, message: 'Rating added successfully', rating: newRating };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Function to get all ratings for a specific task
const getTaskRatings = async (taskId) => {
  try {
    const ratings = await TaskRating.find({ taskId }).populate('userId', 'name');
    return { success: true, ratings };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Function to get average rating for a specific task
const getAverageRating = async (taskId) => {
  try {
    const ratings = await TaskRating.aggregate([
      { $match: { taskId: mongoose.Types.ObjectId(taskId) } },
      { $group: { _id: '$taskId', averageRating: { $avg: '$rating' } } }
    ]);

    if (ratings.length > 0) {
      return { success: true, averageRating: ratings[0].averageRating };
    } else {
      return { success: false, message: 'No ratings found for this task' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Export the functions for use in other parts of the app
export { addRating, getTaskRatings, getAverageRating };
