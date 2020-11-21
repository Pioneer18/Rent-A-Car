import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const ImageSchema = new Schema({
    user_id: String, // ObjectId of the logged in user
    tagName: String,
    originalName: String, 
    bucket: String, // 'rent-a-car-photos/{user_email}/{category}'
    category: String, // rentals or profile
    size: String,
});


/**
 * rent-a-car-photos/sellsj14@gmail.com/category
 *  - 'tag-file'
 */