/**
 * **summary**: interface for the User model
 */
export interface UserInterface {
    username: string;
    email: string;
    password: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
  }
  