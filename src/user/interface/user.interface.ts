export interface UserInterface {
    _id: string;
    username: string;
    email: string;
    password: string;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | null;
    __v?: number;
}
