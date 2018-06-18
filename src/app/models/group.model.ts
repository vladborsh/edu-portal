import { User } from "./user.model";
import { Speciality } from "./speciality.model";

export interface Group {
    title? : string,
    users?: User[],
    speciality?: string,
    institute?: string,
    createdDate?: string,

}