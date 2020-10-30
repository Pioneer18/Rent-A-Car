import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;

export const UserSchema = new Schema({
    userId: ObjectID,
    username: String,
    email: String,
    password: String,
});