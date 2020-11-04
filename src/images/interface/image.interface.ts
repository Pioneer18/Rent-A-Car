import * as mongoose from 'mongoose'

export interface ImageInterface{
    data: Buffer;
    mimeType: string;
    originalName: string;
    encoding: string;
    size: string;
    category: string;
    user_id: string;
}