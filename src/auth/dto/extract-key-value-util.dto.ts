/**
 * **summary**: the data transfer object for the JWT and it's key (last 8 digits of the JWT used for logging out) 
 */
export class ExtractKeyValueUtilDto {
    jwt: string;
    key: string;
}