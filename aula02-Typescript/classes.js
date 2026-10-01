"use strict";
class Pessoa {
    nome;
    fone;
    constructor(nome, fone) {
        this.nome = nome;
        this.fone = fone;
    }
    imprimir() {
        console.log(`Nome: ${this.nome}\nTelefone: ${this.fone}`);
    }
}
class Juridica extends Pessoa {
    cnpj;
    constructor(name, fone, cnpj) {
        super(name, fone);
        this.cnpj = cnpj;
    }
    cadastrar() {
        console.log('Pessoa Jurídica cadastrada com sucesso!');
    }
}
class Fisica extends Pessoa {
    cpf;
    constructor(name, fone, cpf) {
        super(name, fone);
        this.cpf = cpf;
    }
    imprimir() {
        super.imprimir();
        console.log(`CPF: ${this.cpf}`);
    }
    cadastrar() {
        // const name: string | null = prompt("Digite o nome: ")
        // name ? this.nome = name : this.nome = ""
        // const fone: string | null = prompt("Digite o telefone: ")
        // fone ? this.fone = fone : this.fone = ""
        // const cpf: string | null = prompt("Digite o CPF: ")
        // cpf ? this.cpf = cpf : this.cpf = ""
        console.log('Pessoa Física cadastrada com sucesso!');
    }
}
const pf = new Fisica("Maria Inês", "(51)3344-5566", "000.111.222-33");
pf.cadastrar();
pf.imprimir();
const pj = new Juridica("João's Burguer", "(51)98765-4321", "00.111.222/0001-33");
pj.cadastrar();
pj.imprimir();
