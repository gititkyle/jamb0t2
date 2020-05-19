import { Document } from 'mongoose';

export default interface ITrack extends Document {
    mediaId: number,
    artist: string,
    title: string,
    user: string,
    date: Date
}
