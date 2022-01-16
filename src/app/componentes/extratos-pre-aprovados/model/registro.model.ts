import { RegistroDataModel } from "./registro-data.model";

export class RegistroModel {
    constructor(
        public totalResults: number,
        public totalPages: number,
        public data: RegistroDataModel[]
    ) {}
}