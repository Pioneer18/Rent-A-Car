import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ImagesSchema = new Schema({
    // Buffer allows us to stores our images as data in the form of arrays
    img: {data: Buffer, contentType: String },
    // reference the user
});