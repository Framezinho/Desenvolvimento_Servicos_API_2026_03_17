"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let idade = 25;
let nome = "João";
let casado = true;
let filhos = ["Júlia", "Pedro"];
let formacoes = ["Graduação", "Mestrado"];
let trabalho = { empresa: "Senac", anoEntrada: 2015 };
let qualificacao;
let qualquerCoisa = [1, "1"];
//let numeros : number[] = [ 1 , "1"]
let prod1 = {
    id: 1,
    nome: "Coca-Cola"
};
let prod2 = {
    id: 2,
    nome: "Pepsi",
    preco: 7.98
};
let produtos = [
    { id: 3, nome: "Fanta" },
    { id: 4, nome: "Trakinas", preco: 3.95 }
];
function somar(x, y) {
    return x + y;
}
function concatenar(x, y) {
    if (typeof x === "number" && typeof y === "number") {
        return x + y;
    }
    else {
        return "" + x + y;
    }
}
//console.log( somar( 2 , 7 ) )
console.log(concatenar(2, 7));
console.log(concatenar("2", 7));
console.log(concatenar(2, "7"));
console.log(concatenar("2", "7"));
// Union Types
let codigo;
codigo = 1;
codigo = "1";
//let turno : string = "Manhã"
//let MANHA : string = "Manhã"
//let TARDE : string = "Tarde"
var Turno;
(function (Turno) {
    Turno[Turno["MANHA"] = 0] = "MANHA";
    Turno[Turno["TARDE"] = 1] = "TARDE";
    Turno[Turno["NOITE"] = 2] = "NOITE";
})(Turno || (Turno = {}));
let turno = Turno.MANHA;
// if( turno == Turno.NOITE ){
// }else{
// }
//# sourceMappingURL=ola.js.map