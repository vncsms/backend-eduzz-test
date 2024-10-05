export interface ICreateLoggerDTO {
    level: string,
    request: string,
    response?: string,
    error?: string
}