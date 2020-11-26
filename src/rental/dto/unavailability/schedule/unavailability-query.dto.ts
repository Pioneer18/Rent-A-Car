/**
 * **summary**: this data is used to check if the request to schedule Unavailability will overlap with Unavailability already scheduled for the rental in the database.
 * This dto uses a MongoDB $or aggregator to check the following Unavailability overlap conditions:
 *  - 1: verify the requested Unavailability does not 'enclose' an already scheduled Unavailability for this rental
 *  - 2: verify the requested Unavailability does not 'overlap' the end of an already scheduled Unavailability for this rental
 *  - 3: verify the requested Unavailability does not 'overlap' the start of an already scheduled Unavailability for this rental
 *  - 4: verify the requested Unavailability is not 'enclosed by' an already scheduled Unavailability for this rental
 */
export class UnavailabilityQueryDto {
  rentalId: string;
  year: number;
  doy: { $lte: number; $gte: number };
  $or: [
    {
      start: { $gte: number};
      end: { $lte: number };
    },
    {
      start: {$lte: number};
      end: { $gte: number };
    },
    {
        start: {$lte: number},
        end: {$gte: number},
    },
    {
        start: {$lte: number},
        end: {$gte: number},
    }
  ];
}

