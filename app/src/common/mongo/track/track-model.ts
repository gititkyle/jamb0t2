import ITrack               from './track-interface';
import mongoose, { Schema } from 'mongoose';

const TrackSchema: Schema = new Schema({
    mediaId: {
        type: Number,
        required: true,
        index: true
    },
    artist: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        index: true
    }
});

export default mongoose.model<ITrack>('Track', TrackSchema);
