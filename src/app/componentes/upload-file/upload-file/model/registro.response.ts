export class RegistroIntegrationResponse {
    constructor(
        public data: string,
        public descricao: string,
        public documento: string,
        public entrada: boolean,
        public valor: number
    ) {}
}