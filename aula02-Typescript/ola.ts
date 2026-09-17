function soma ( a: number, b: number ) {
    return a + b;
}

console.log(soma(2, 3));

interface Pessoa {
    nome: string;
    idade: number;
}

let produto: Pessoa = {
    nome: "João",
    idade: 30
};