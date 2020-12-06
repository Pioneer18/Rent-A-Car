/**
 * **summary**: Interface for the images.service.delteImages() method. This is an interface of the response object
 */
export interface DeleteResponseInterface {
    n?: number;
      opTime?: {
          ts: number | string;
          t: number;
      },
      electionId?: string;
      ok?: number;
      $clusterTime?: {
          clusterTime: number | string;
          signature: {
              hash: string;
              keyId: string;
          }
      },
      operationTime?: string | number;
      deletedCount?: number
  }
