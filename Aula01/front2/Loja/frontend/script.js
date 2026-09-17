const API_URL = "http://localhost:8001";

let dadosAtuais = [];

let tipoAtual = "";


/* =========================================
   CATEGORIAS
========================================= */

async function loadCategorias() {

    mostrarLoading();

    try {

        const resposta = await fetch(
            `${API_URL}/categoria`
        );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar categorias"
            );

        }


        const dados = await resposta.json();


        dadosAtuais = dados;

        tipoAtual = "categorias";


        montarTabelaCategorias(dados);


        $("#statusApi")
            .removeClass("bg-danger bg-secondary")
            .addClass("bg-success")
            .text("Online");


    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            "Erro ao conectar com a API.",
            "danger"
        );


        $("#statusApi")
            .removeClass("bg-success bg-secondary")
            .addClass("bg-danger")
            .text("Offline");


    } finally {

        esconderLoading();

    }

}


/* =========================================
   TABELA CATEGORIAS
========================================= */

function montarTabelaCategorias(dados) {

    let html = `

        <thead class="table-dark">

            <tr>

                <th>ID</th>

                <th>Nome</th>

                <th>Ações</th>

            </tr>

        </thead>

        <tbody>

    `;


    if (dados.length === 0) {

        html += `

            <tr>

                <td
                    colspan="3"
                    class="text-center">

                    Nenhuma categoria encontrada.

                </td>

            </tr>

        `;

    } else {

        dados.forEach(categoria => {

            html += `

                <tr>

                    <td>

                        <span class="badge bg-secondary">

                            ${categoria.id}

                        </span>

                    </td>


                    <td>

                        ${categoria.nome}

                    </td>


                    <td>

                        <button
                            class="btn btn-sm btn-primary"
                            onclick="visualizarDado(${categoria.id})">

                            <i class="bi bi-eye"></i>

                            Visualizar

                        </button>

                        <button
                            class="btn btn-sm btn-danger"
                            onclick="excluirCategoria(${categoria.id})">

                            <i class="bi bi-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

    }


    html += "</tbody>";


    $("#tblDados").html(html);


    atualizarContador(dados.length);

}


/* =========================================
   PRODUTOS
========================================= */

async function loadProdutos() {

    mostrarLoading();

    try {

        const resposta = await fetch(
            `${API_URL}/produto`
        );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar produtos"
            );

        }


        const dados = await resposta.json();


        dadosAtuais = dados;

        tipoAtual = "produtos";


        montarTabelaProdutos(dados);


        $("#statusApi")
            .removeClass("bg-danger bg-secondary")
            .addClass("bg-success")
            .text("Online");


    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            "Erro ao conectar com a API.",
            "danger"
        );


    } finally {

        esconderLoading();

    }

}


/* =========================================
   TABELA PRODUTOS
========================================= */

function montarTabelaProdutos(dados) {

    let html = `

        <thead class="table-dark">

            <tr>

                <th>ID</th>

                <th>Produto</th>

                <th>Preço</th>

                <th>Categoria</th>

                <th>Ações</th>

            </tr>

        </thead>

        <tbody>

    `;


    dados.forEach(produto => {

        html += `

            <tr>

                <td>

                    <span class="badge bg-secondary">

                        ${produto.id}

                    </span>

                </td>


                <td class="fw-semibold">

                    ${produto.nome}

                </td>


                <td>

                    R$ ${Number(produto.preco).toFixed(2)}

                </td>


                <td>

                    <span class="badge bg-primary">

                        ${produto.categoria ?? "Sem categoria"}

                    </span>

                </td>


                <td>

                    <button
                        class="btn btn-sm btn-primary"
                        onclick="visualizarDado(${produto.id})">

                        <i class="bi bi-eye"></i>

                    </button>


                    <button
                        class="btn btn-sm btn-danger"
                        onclick="excluirProduto(${produto.id})">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });


    html += "</tbody>";


    $("#tblDados").html(html);


    atualizarContador(dados.length);

}


/* =========================================
   VISUALIZAR
========================================= */

function visualizarDado(id) {

    const dado = dadosAtuais.find(
        item => item.id == id
    );


    if (!dado) return;


    $("#modalTitulo").text(
        tipoAtual === "categorias"
            ? "Detalhes da Categoria"
            : "Detalhes do Produto"
    );


    let html = "";


    Object.entries(dado).forEach(
        ([chave, valor]) => {

            html += `

                <div class="mb-3">

                    <label class="form-label fw-bold">

                        ${chave}

                    </label>

                    <input
                        type="text"
                        class="form-control"
                        value="${valor ?? ""}"
                        readonly>

                </div>

            `;

        }
    );


    $("#modalConteudo").html(html);


    const modal = new bootstrap.Modal(
        document.getElementById("modalDados")
    );


    modal.show();

}


/* =========================================
   EXCLUIR CATEGORIA
========================================= */

async function excluirCategoria(id) {

    if (!confirm(
        "Deseja realmente excluir esta categoria?"
    )) {

        return;

    }


    try {

        const resposta = await fetch(

            `${API_URL}/categoria/${id}`,

            {
                method: "DELETE"
            }

        );


        const dados = await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.erro
            );

        }


        mostrarMensagem(
            "Categoria excluída com sucesso!",
            "success"
        );


        loadCategorias();


    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "danger"
        );

    }

}


/* =========================================
   EXCLUIR PRODUTO
========================================= */

async function excluirProduto(id) {

    if (!confirm(
        "Deseja realmente excluir este produto?"
    )) {

        return;

    }


    try {

        const resposta = await fetch(

            `${API_URL}/produto/${id}`,

            {
                method: "DELETE"
            }

        );


        const dados = await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.erro
            );

        }


        mostrarMensagem(
            "Produto excluído com sucesso!",
            "success"
        );


        loadProdutos();


    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "danger"
        );

    }

}


/* =========================================
   PESQUISA
========================================= */

function filtrarTabela() {

    const pesquisa = $("#campoPesquisa")
        .val()
        .toLowerCase();


    $("#tblDados tbody tr").each(
        function () {

            const texto = $(this)
                .text()
                .toLowerCase();


            $(this).toggle(
                texto.includes(pesquisa)
            );

        }
    );

}


/* =========================================
   CONTADOR
========================================= */

function atualizarContador(total) {

    $("#contador").text(

        `${total} registro${total !== 1 ? "s" : ""}`

    );


    if (tipoAtual === "categorias") {

        $("#totalCategorias").text(total);

    }


    if (tipoAtual === "produtos") {

        $("#totalProdutos").text(total);

    }

}


/* =========================================
   LOADING
========================================= */

function mostrarLoading() {

    $("#loading").removeClass("d-none");

}


function esconderLoading() {

    $("#loading").addClass("d-none");

}


/* =========================================
   MENSAGEM
========================================= */

function mostrarMensagem(
    texto,
    tipo = "danger"
) {

    $("#mensagem")

        .removeClass(
            "d-none alert-danger alert-success alert-warning"
        )

        .addClass(
            `alert-${tipo}`
        )

        .text(texto);

}


/* =========================================
   ATUALIZAR
========================================= */

function atualizarDados() {

    if (tipoAtual === "categorias") {

        loadCategorias();

    }

    else if (tipoAtual === "produtos") {

        loadProdutos();

    }

}


/* =========================================
   LIMPAR
========================================= */

function limparTabela() {

    dadosAtuais = [];

    tipoAtual = "";


    $("#campoPesquisa").val("");


    $("#tblDados").html(`

        <tbody>

            <tr>

                <td
                    colspan="5"
                    class="text-center py-5">

                    <i
                        class="bi bi-database fs-1 text-muted">
                    </i>

                    <p class="text-muted mt-2">

                        Selecione uma opção acima.

                    </p>

                </td>

            </tr>

        </tbody>

    `);


    $("#contador").text(
        "0 registros"
    );

}