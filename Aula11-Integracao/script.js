function getProdutos(){

    const req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            const produtos = JSON.parse( this.responseText )
            const tabela = document.getElementById("tblProdutos")
            produtos.forEach( prod => {
                if( document.getElementById( "p" + prod.id) == null ){
                    var linha = tabela.insertRow( -1 )
                    linha.id = "p"+ prod.id
                    cellId = linha.insertCell( 0 );
                    cellNome = linha.insertCell( 1 );
                    cellPreco = linha.insertCell( 2 );
                    cellCategoria = linha.insertCell( 3 );

                    cellId.innerHTML = prod.id
                    cellNome.innerHTML = prod.nome
                    cellPreco.innerHTML = prod.preco
                    cellCategoria.innerHTML = prod.categoria
                }

            });

        }
    }
    req.open("GET" , "http://localhost:8001/product", true)
    req.send()

}