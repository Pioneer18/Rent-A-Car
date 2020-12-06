/**
 * **summary**: This is a lean version of the ImageModelInterface for saving new images
 * and retrieving them from the database
 */
export interface Image {
    _id?: string;
    user_id: string;
    rental_id: string;
    bucket: string;
    key: string;
    etag: string;
    category: string;
    size: number;
    location: string;
    __v?: number;
}
