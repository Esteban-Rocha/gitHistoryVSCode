import { injectable } from 'inversify';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { ActionedDetails } from '../../contracts';
import { IActionDetailsParser } from '../contracts';

@injectable()
export class ActionDetailsParser implements IActionDetailsParser {
    public parse(name: string, email: string, unixTime: string): ActionedDetails | undefined {
        if (name.trim().length === 0 || unixTime.trim().length === 0) {
            return;
        }

        const time = parseInt(unixTime, 10);
        const date = new Date(time * 1000);
        // Todo: Formatting of dates shouldn't be done here
        const localisedDate = '';

        return {
            date, localisedDate,
            email, name
        };
    }
}

// export function formatDate(date: Date) {
//     const lang = env.language;
//     const dateOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
//     return date.toLocaleString(lang, dateOptions);
// }