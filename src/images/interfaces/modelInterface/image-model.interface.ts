import * as mongoose from 'mongoose';
/**
 * **summary**: Interface for the Image Model
 */
export interface ImageModelInterface extends mongoose.Document {
    user_id: string;
    rental_id: string;
    bucket: string;
    key: string;
    etag: string;
    category: string;
    size: number;
    location: string;
}
