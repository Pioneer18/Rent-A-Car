/**
 * **summary**: Interface for the response of an update query
 */
export interface UpdateResponseInterface {
    n: number;
    nModified: number;
    opTime: {
        "ts": string | number;
        "t": number;
    },
    electionId: string;
    ok: number;
    $clusterTime: {
        "clusterTime": string;
        "signature": {
            "hash": string | number;
            "keyId": string | number;
        }
    },
    operationTime: string | number;
}