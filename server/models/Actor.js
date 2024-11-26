import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    biography: { type: String },
    profileImage: { type: String },
});

export default mongoose.model('Actor', actorSchema);
