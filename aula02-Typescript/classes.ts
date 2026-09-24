class pessoa {
    nome : string;
    fone : string;
    constructor(nome: string, fone: string) {
        this.nome = nome;
        this.fone = fone;
    }   
    imprimir() : void {
        console.log(`Nome: ${this.nome} \n Telefone: ${this.fone}`)
    }
}


class fisica extends pessoa {
    cpf : string;
    constructor(nome: string, fone: string, cpf: string) {
        super(nome, fone);
        this.cpf = cpf;
    }
}

class juridica extends pessoa {
    cnpj : string;
    constructor(nome: string, fone: string, cnpj: string) {
        super(nome, fone);
        this.cnpj = cnpj        ;
    }
}

const p1 = new pessoa("João", "9999-9999")
p1.imprimir()