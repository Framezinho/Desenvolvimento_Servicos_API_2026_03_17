"use strict";
class pessoa {
    nome;
    fone;
    constructor(nome, fone) {
        this.nome = nome;
        this.fone = fone;
    }
    imprimir() {
        console.log(`Nome: ${this.nome} \n Telefone: ${this.fone}`);
    }
}
const p1 = new pessoa("João", "9999-9999");
p1.imprimir();
