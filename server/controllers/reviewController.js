import { addRating, getTaskRatings, getAverageRating } from '../models/ratingTask.js'; // Import rating task functions

// Controller to add a review for a task
const addReview = async (req, res) => {
  const { taskId, rating, review } = req.body;
  const userId = req.user.id; // Assuming the user is authenticated and the user ID is available in the request.

  // Call the addRating function to add the rating and review
  const result = await addRating(taskId, userId, rating, review);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

// Controller to get all reviews for a specific task
const getReviewsForTask = async (req, res) => {
  const { taskId } = req.params;

  // Call the getTaskRatings function to fetch the reviews for the task
  const result = await getTaskRatings(taskId);
  if (result.success) {
    res.status(200).json(result.ratings);
  } else {
    res.status(404).json(result);
  }
};

// Controller to get the average rating for a task
const getTaskAverageRating = async (req, res) => {
  const { taskId } = req.params;

  // Call the getAverageRating function to get the average rating
  const result = await getAverageRating(taskId);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
};

export { addReview, getReviewsForTask, getTaskAverageRating };
