import { injectable } from 'inversify';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Status } from '../../contracts';
import { IFileStatStatusParser } from '../contracts';

@injectable()
export class FileStatStatusParser implements IFileStatStatusParser {
    public canParse(status: string): boolean {
        const parsedStatus = this.parse(status);
        return parsedStatus !== undefined && parsedStatus !== null;
    }
    public parse(status: string): Status | undefined {
        switch (status) {
            case 'A':
                return Status.Added;
            case 'M':
                return Status.Modified;
            case 'D':
                return Status.Deleted;
            case 'C':
                return Status.Copied;
            case 'R':
                return Status.Renamed;
            default: {
                console.error(`Unrecognized file stat status '${status}`);
                return;
            }
        }
    }
}