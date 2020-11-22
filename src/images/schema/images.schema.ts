import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const ImageSchema = new Schema({
    user_id: String, // ObjectId of the logged in user
    rental_id: {type: String || null }, // null for profile images
    bucket: String, // 'rent-a-car-photos/{user_email}/{category}'
    key: String, // 'timestamp-originalname'
    originalName: String, 
    etag: String || null,
    category: String, // rentals or profile
    size: String,
    location: String, // aws url for image download
});


/**
 * rent-a-car-photos/sellsj14@gmail.com/category
 *  - 'etag-file'
 */