export interface ResponseModel<T> {
    success: boolean,
    message: string,
    item?: T,
    items?: [T],
}