export interface UnavailabilityQuery {
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

/**
 * between start >= init && start <= final and end  <= final && end >= init
 * or: start < init and end >= init && end <= final; it starts earlier but overlaps
 * or: start >= init && start =< final and end > end; it overhangs the end
 * or: start < init and end > end
 */

/**
 *
 */
