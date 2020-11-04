import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ImageSchema = new Schema({
    // Buffer allows us to stores our images as data in the form of arrays
    data: Buffer,
    mimeType: String,
    originalName: String,
    encoding: String,
    size: String,
    category: String, // vehicle or profile
    user_id: String, // ObjectId of the logged in user
});