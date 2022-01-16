export class RegistroCaixaModel {
    constructor(
        public id: number,
        public dataCriacao: Date,
        public descricao: string,
        public valor: number,
        public entrada: boolean,
        public saldoFinal: number
    ) {}
}