let idade: number = 25;
let nome: string = "João";
let casado: boolean = true;

let filhos: string[] = ["Júlia" , "Pedro"]
let formacoes: Array<string> = ["Graduação" , "Mestrado"]
let trabalho: object = { empresa : "Senac" , anoEntrada : 2015}
let qualificacao : any ;
let qualquerCoisa : any[] = [ 1 , "1"]
//let numeros : number[] = [ 1 , "1"]



let prod1 : Produto = {
    id : 1 ,
    nome : "Coca-Cola"
}

let prod2 : Produto = {
    id : 2 ,
    nome : "Pepsi" ,
    preco : 7.98
}

interface Produto{
    id : number ,
    nome : string ,
    preco? : number
}
let produtos : Produto[] = [
    { id : 3 , nome : "Fanta" } , 
    { id : 4 , nome : "Trakinas" , preco : 3.95 }
]

function somar( x: number , y: number) : number{
    return x + y
}

function concatenar( x: number | string , y: number | string) : number | string {
    if( typeof x === "number"  && typeof y === "number" ){
        return x + y
    }else{
        return "" + x + y       
    }
}

//console.log( somar( 2 , 7 ) )
console.log( concatenar( 2 , 7 ) )
console.log( concatenar( "2" ,  7  ) )
console.log( concatenar(  2  , "7" ) )
console.log( concatenar( "2" , "7" ) )

// Union Types
let codigo : number | string
codigo = 1
codigo = "1" 

//let turno : string = "Manhã"

//let MANHA : string = "Manhã"
//let TARDE : string = "Tarde"

enum Turno {
    MANHA ,
    TARDE ,
    NOITE
}

let turno : Turno = Turno.MANHA

// if( turno == Turno.NOITE ){

// }else{

// }