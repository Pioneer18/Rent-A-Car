/**
 * **summary**: Interface for the images.service.delteImages() method. This is an interface of the response object
 */
export interface DeleteResponseInterface {
    n: number;
    opTime: {
        ts: number;
        t: number;
    }
    electionId: string;
    ok: number;
    $clusterTime: {
        clusterTime: number;
        signature: {
            hash: string;
            keyId: number;
        }
    },
    operationTime: number;
    deletedCount: number;
}