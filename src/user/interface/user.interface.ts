export interface UserInterface {
    _id: string;
    username: string;
    email: string;
    password: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
}
