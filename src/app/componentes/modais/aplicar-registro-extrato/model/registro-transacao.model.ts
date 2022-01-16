import { TransacaoDeRegistroModel } from "./transacao-de-registro.model";

export class RegistroTransacaoModel {
    constructor(
        public id: number,
        public data: string,
        public descricao: string,
        public documento: string,
        public entrada: boolean,
        public valor: number,
        public banco: number,
        public descricaoPessoal: string,
        public transacao: TransacaoDeRegistroModel,
    ) {}
}