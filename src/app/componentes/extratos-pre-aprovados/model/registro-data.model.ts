import { BancoEnum } from "../../upload-file/upload-file/enum/banco.enum";

export class RegistroDataModel {
    constructor(
        public id: string,
        public banco: BancoEnum,
        public data: string,
        public descricao: string,
        public documento: string,
        public entrada: boolean,
        public valor: number
    ) { }
}