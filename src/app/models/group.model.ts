import { User } from "./user.model";
import { Subject } from "./subject.model";

export interface Mark {
    _id?: string,
    mark?: number,
    date?: String,
}

export interface JournalRow {
    _id?: string,
    _student?: User,
    marks?: [Mark],
}

export interface Journal {
    _id?: string,
    _subject?: Subject,
    marksDate?: [string],
    markListSize?: number,
    journalRows?: [JournalRow],
}

export interface Group {
    _id? : string,
    title? : string,
    users?: User[],
    speciality?: string,
    institute?: string,
    createdDate?: string,
    journals?: [Journal]
}