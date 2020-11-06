import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: String,
    email: { 
        type: String, 
        unique: true
    },
    password: String,
});