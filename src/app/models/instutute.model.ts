import { Group } from "./group.model";

export interface Institute {
    _id? : string,
    title? : string,
    status?: string,
    groups?: Group[],
    createdDate?: string,
}