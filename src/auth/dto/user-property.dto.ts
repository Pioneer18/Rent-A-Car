/**
 * **summary**: the data transfer object for the [**req.user**](http://www.passportjs.org/docs/authenticate/) property added to the request by passport when a user is authenticated
 */
export class UserPropertyDto {
    _id: string;
    username: string;
    email: string;
    password: string;
}