import fs from 'fs';
import Movie from '../models/Movie.js';
import Bull from 'bull';

const movieQueue = new Bull('movieQueue');

movieQueue.process(async (job, done) => {
    const { filePath } = job.data;

    try {
        // Read the JSON file and parse its content
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const movies = JSON.parse(fileContent);

        // Insert movies into the database
        for (const movie of movies) {
            await Movie.create(movie);
        }
        done();
    } catch (err) {
        done(err); // Handle errors gracefully
    }
});

export default movieQueue;
