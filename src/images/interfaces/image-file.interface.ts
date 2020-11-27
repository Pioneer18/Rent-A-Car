/**
 * **summary**: Interface for the individual image files uploaded to the applicaiton
 */
export interface ImageFileInterface {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    contentDisposition: null;
    storageClass: string;
    serverSideEncryption: null;
    metadata: null;
    location: string;
    etag: string;
}