import { Group } from "./group.model";

export interface Institute {
    title? : string,
    status?: string,
    groups?: Group[],
    createdDate?: string,
}