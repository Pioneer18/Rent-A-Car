/**
 * **summary**: Interface for the return data of the auth.servie.validateUser() method
 */
export interface ValidateUserReturn {
    _id: string;
    username: string;
    email: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
}
