import { RegistroDataResponse } from "./registro-data.response";

export class RegistroResponse {
    constructor(
        public totalResults: number,
        public totalPages: number,
        public data: RegistroDataResponse[]
    ) {}
}