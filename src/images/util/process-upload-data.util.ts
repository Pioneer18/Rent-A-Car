import { Injectable } from "@nestjs/common";
import { ProcessedUploadDataInterface } from "../interface/processed-upload-data.interface";

/**
 * Return either one image buffer or an array of images buffers
 */
@Injectable()
export class ProcessUploadDataUtil {

    /**
     * Process:
     * summary: map the below data into a single params object or
     * an array of param objects depending on the # of files 
     * @param {object | array} files
     * @param bucket rent-a-car-photos/{user.email}/{category}
     */
    process = (files, bucket): ProcessedUploadDataInterface => {
        // check # of files
        try {
            if (files) {
                console.log('Checking Files in Process Util')
                // if multiple create an array of param objects
                if (files.length > 1) {
                    console.log('Multiple Files Found: Processing...')
                    const params = files.map(item => {
                        return {
                            Bucket: bucket,
                            Key: item.originalname,
                            Body: item.buffer,
                        }
                    })
                    const doc: ProcessedUploadDataInterface = {
                        param: null,
                        params: params
                    }
                    console.log('Returned Doc: For Multiple Files')
                    return doc;
                }
                // if single make only a single param object
                console.log(files);
                const doc: ProcessedUploadDataInterface = {
                    param: {
                        Bucket: bucket,
                        Key: files[0].originalname,
                        Body: files[0].buffer,
                    },
                    params: null
                }
                console.log('Returned Doc: For single File')
                return doc;
            }
        } catch (err) {
            if (err) { throw new Error(err) }
        }
    }
}