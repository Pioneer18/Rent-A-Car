import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const ImageSchema = new Schema({
    user_id: String, // ObjectId of the logged in user
    tag: Number, // an indexed 8 digit number given when uploaded to AWS Bucket
    originalName: String, // image file original name
    bucket: String, // 'rent-a-car-photos/{user_email}/{category}'
    category: String, // rentals or profile
    size: String,
});