export class TransacaoDeRegistroModel {
    constructor(
        public idUsuarioOrigem: number,
        public idUsuarioDestinatario: number,
        public geraComissao: boolean,
        public porcentagemComissao: number,
        public valorComissao: number,
        public comissaoRegistro: number
    ) {}
}