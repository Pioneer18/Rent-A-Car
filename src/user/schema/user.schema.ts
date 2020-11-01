import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

export const UserSchema = new Schema({
    // userId: ObjectId,
    username: String,
    email: String,
    password: String,
});