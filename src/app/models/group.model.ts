import { User } from "./user.model";
import { Subject } from "./subject.model";

export interface Mark {
    mark: number,
    date: String,
}

export interface JournalRow {
    _student: User,
    marks: [Mark],
}

export interface Journal {
    _subject: Subject,
    journalRows: [JournalRow],
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