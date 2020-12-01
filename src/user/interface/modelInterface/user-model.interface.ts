import * as mongoose from "mongoose";
/**
 * **summary**: interface for the User model
 */
export interface UserModelInterface extends mongoose.Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    setExpirationDate: Function;
    setResetToken: Function;
  }
  