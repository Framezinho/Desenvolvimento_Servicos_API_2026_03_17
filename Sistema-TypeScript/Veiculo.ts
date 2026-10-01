class Veiculo {
    private id: number;
    protected modelo: string;
    private km: number;
    public ano: number;
    public placa: string;

    constructor(id: number, modelo: string, km: number, ano: number, placa: string) {
        this.id = id;
        this.modelo = modelo;
        this.km = km;
        this.ano = ano;
        this.placa = placa;
    }

    // Modelo
    public setModelo(modelo: string): void {
        this.modelo = modelo;
    }

    public getModelo(): string {
        return this.modelo;
    }

    // Ano
    public setAno(ano: number): void {
        this.ano = ano;
    }

    public getAno(): number {
        return this.ano;
    }

    // KM
    public setKm(km: number): void {
        this.km = km;
    }

    public getKm(): number {
        return this.km;
    }

    // Imprimir
    public imprimir(): void {
        console.log("ID:", this.id);
        console.log("Modelo:", this.modelo);
        console.log("KM:", this.km);
        console.log("Ano:", this.ano);
        console.log("Placa:", this.placa);
    }
}

// Classe Carro
class Carro extends Veiculo {
    private partes: number;

    constructor(
        id: number,
        modelo: string,
        km: number,
        ano: number,
        placa: string,
        partes: number
    ) {
        super(id, modelo, km, ano, placa);
        this.partes = partes;
    }

    public setPartes(p: number): void {
        this.partes = p;
    }

    public getPartes(): number {
        return this.partes;
    }

    public imprimir(): void {
        super.imprimir();
        console.log("Partes:", this.partes);
    }
}

// Classe Moto
class Moto extends Veiculo {
    private cilindradas: number;

    constructor(
        id: number,
        modelo: string,
        km: number,
        ano: number,
        placa: string,
        cilindradas: number
    ) {
        super(id, modelo, km, ano, placa);
        this.cilindradas = cilindradas;
    }

    public setCilindradas(c: number): void {
        this.cilindradas = c;
    }

    public getCilindradas(): number {
        return this.cilindradas;
    }

    public imprimir(): void {
        super.imprimir();
        console.log("Cilindradas:", this.cilindradas);
    }
}

// Exemplo de uso
const carro = new Carro(1, "Gol", 50000, 2020, "ABC-1234", 4);
carro.imprimir();

console.log("----------------");

const moto = new Moto(2, "CG 160", 15000, 2022, "XYZ-5678", 160);
moto.imprimir();