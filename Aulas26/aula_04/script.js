function ler() {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4) {
            var divConteudo = document.getElementById("conteudo");
            if (this.status == 200) {
                divConteudo.textContent = this.responseText;
            } else {
                divConteudo.textContent = "Erro ao carregar o arquivo.";
            }
        }
    };

    req.open("GET", "informacoes.txt", true);
    req.send();
}

function gerar() {
    var valor = document.getElementById("txtNumero").value;

    // Validação: impede envio vazio ou número inválido
    if (valor === "" || isNaN(valor) || Number(valor) <= 0) {
        document.getElementById("divNumero").innerHTML = "Por favor, informe um número válido.";
        return;
    }

    var divNumero = document.getElementById("divNumero");
    divNumero.innerHTML = "Carregando...";

    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                divNumero.innerHTML = this.responseText;
            } else {
                divNumero.innerHTML = "Erro ao contatar o servidor.";
            }
        }
    };

    req.open("GET", "servidor.php?numero=" + encodeURIComponent(valor), true);
    req.send();
}
