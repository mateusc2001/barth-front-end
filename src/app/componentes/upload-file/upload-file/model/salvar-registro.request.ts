import { BancoEnum } from "../enum/banco.enum";

export class RegistroRequest {
    constructor(
        public data: string,
        public descricao: string,
        public documento: string,
        public entrada: boolean,
        public valor: number,
        public banco: BancoEnum
    ) {}
}