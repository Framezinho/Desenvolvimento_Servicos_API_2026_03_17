function lerXML(){
    const req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            const dadosXML = this.responseXML
            const divDados = document.getElementById("divDados")
            divDados.innerHTML = this.responseText + "<hr>"
            const cpfs = dadosXML.getElementsByTagName("cpf")
            const cpf = cpfs[0].childNodes[0].nodeValue
            
            const nome = dadosXML.getElementsByTagName("nome")[0].childNodes[0].nodeValue
            divDados.innerHTML += "Nome: " + nome
            divDados.innerHTML += "<br>CPF: " + cpf
            const conjuge = dadosXML.getElementsByTagName("conjuge")
            const nomeConjuge = conjuge[0].getElementsByTagName("nome")[0].childNodes[0].nodeValue
            const idadeConjuge = conjuge[0].getElementsByTagName("idade")[0].childNodes[0].nodeValue
            divDados.innerHTML += "<br> Conjuge: " + nomeConjuge + " - Idade: " + idadeConjuge
            const objFilhos = dadosXML.getElementsByTagName("filhos")
            const filhos = objFilhos[0].getElementsByTagName("filho")
            divDados.innerHTML += "<br>Filhos: "
            for ( i = 0; i < filhos.length ; i++) {
                nomeFilho = filhos[i].getElementsByTagName("nome")[0].childNodes[0].nodeValue
                idadeFilho = filhos[i].getElementsByTagName("idade")[0].childNodes[0].nodeValue
                divDados.innerHTML += "<br>" + nomeFilho + " - Idade: " + idadeFilho

                objAltura = filhos[i].getElementsByTagName("altura")
                if( objAltura.length > 0 ){
                    alturaFilho = objAltura[0].childNodes[0].nodeValue
                    divDados.innerHTML += " - Altura: " + alturaFilho
                }
            }
        }
    }
    req.open("GET", "dados.xml")
    req.send()
}