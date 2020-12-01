export interface Image {
    user_id: string;
    rental_id: string;
    bucket: string;
    key: string;
    etag: string;
    category: string;
    size: number;
    location: string;
}