/**
 * **summary**: data transfer object for verifying their is no typo in the requested new password data
 */
export class CheckPasswordTypoDto {
    newPassword: string;
    confirmPassword: string;
}