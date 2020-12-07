export interface UserInterface {
    _id?: string;
    username: string;
    email: string;
    password: string;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | string | null;
    __v?: number;
}
