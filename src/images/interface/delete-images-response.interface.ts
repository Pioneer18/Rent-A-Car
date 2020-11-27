export interface DeleteImagesResponseInterface {
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