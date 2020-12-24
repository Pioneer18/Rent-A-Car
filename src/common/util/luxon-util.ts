/**
 * **summary**: Exports Luxon functionality
 */
export class LuxonUtil {
    constructor(){}

    /**
     * **summary**: Convert each JS Date object to a DateTime
     */
    dateToDateTime = async (dates: Date[]) => {
        const dateTimes = dates.map( date => {

        })
    }

    /**
     * **summary**: Duration in days
     */

    /**
     * **summary**: Duration in years
     */

    /**
     * **summary**:  DateTime to JS Date object
     */

    /**
     * **summary**: Creates a JS Date object from either a **date string** or an **epoch timestamp**
     * - December 17, 1995 03:24:00
     * - 1995-12-17T03:24:00
     * - 628021800000
     */
    createJsDate = (data: string[]): Date[] => {
        try {
            const dates: Date[] =  data.map( item => {
                return new Date(item)
            });
            return dates;
        } catch (err) {
            if (err) throw new Error(err);
        }
    }
}
