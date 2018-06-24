import { Subject } from "./subject.model";


export interface Scheduling {
    _id?: string,
    _subject?: string | Subject,
    _group?: string,
    weekDay?: number,
    orderNumber?: number,
    type?: string,
    createdDate?: string,
}