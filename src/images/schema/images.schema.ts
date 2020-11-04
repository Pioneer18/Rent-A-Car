import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

export const ImageSchema = new Schema({
    // Buffer allows us to stores our images as data in the form of arrays
    data: Buffer,
    mimeType: String,
    originalName: String,
    encoding: String,
    size: String,
    user_id: ObjectId // id of the logged in user
});