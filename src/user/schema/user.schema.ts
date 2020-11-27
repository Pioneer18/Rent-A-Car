import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const Schema = mongoose.Schema;
/**
 * **summary**: schema for the User model
 */
export const UserSchema = new Schema({
    username: String,
    email: { 
        type: String, 
        unique: true
    },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

UserSchema.methods.setExpirationDate = function() {
    let user = this;
    // grab current date and time
    const timestamp = Date.now();
    // set expiration date
    const expir = timestamp + 1800000; // 30 minutes
    user.resetPasswordExpires = expir;
}

UserSchema.methods.setResetToken = function() {
    let user = this;
    // generate random token
    let buf = crypto.randomBytes(20);
    // convert to hexadecimal string
    const token = buf.toString('hex');
    user.resetPasswordToken = token;
}