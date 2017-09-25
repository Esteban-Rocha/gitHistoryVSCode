import { REMOTE_REF_PREFIXES } from './constants';

export function isRemoteHead(ref: string) {
    return REMOTE_REF_PREFIXES.filter(item => ref.startsWith(item)).length > 0;
}

export function getRemoteHeadName(ref: string) {
    const prefix = REMOTE_REF_PREFIXES.find(item => ref.startsWith(item))!;
    return ref.substring(prefix.length);
}
