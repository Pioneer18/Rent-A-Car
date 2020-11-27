/**
 * **summary**: interface for the Image Model
 */
export interface ImageInterface{
    user_id: string;
    rental_id: string;
    bucket: string;
    key: string;
    etag: string;
    category: string;
    size: string;
    location: string;
}