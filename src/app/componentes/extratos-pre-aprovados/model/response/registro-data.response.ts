export class RegistroDataResponse {
    constructor(
        public id: string,
        public banco: number,
        public data: string,
        public descricao: string,
        public documento: string,
        public entrada: boolean,
        public valor: number
    ) { }
}