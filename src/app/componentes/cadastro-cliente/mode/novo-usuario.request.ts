export class NovoUsuarioRequest {
    constructor(
        public nomeCompleto: string,
        public usuario: string,
        public senha: string,
        public base64image: string
    ) {}
}