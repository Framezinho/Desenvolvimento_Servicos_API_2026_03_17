const express = require("express");

const router = express.Router();

const conexao = require("../db");


/* =================================
   LISTAR PRODUTOS
================================= */

router.get("/", async (req, res) => {

    try {

        const [resultado] = await conexao.query(`

            SELECT
                produto.id,
                produto.nome,
                produto.preco,
                produto.codCategoria,
                categoria.nome AS categoria

            FROM produto

            LEFT JOIN categoria
                ON produto.codCategoria = categoria.id

            ORDER BY produto.id

        `);


        res.json(resultado);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar produtos"
        });

    }

});


/* =================================
   BUSCAR PRODUTO POR ID
================================= */

router.get("/:id", async (req, res) => {

    try {

        const id = req.params.id;


        const [resultado] = await conexao.query(`

            SELECT
                produto.id,
                produto.nome,
                produto.preco,
                produto.codCategoria,
                categoria.nome AS categoria

            FROM produto

            LEFT JOIN categoria
                ON produto.codCategoria = categoria.id

            WHERE produto.id = ?

        `, [id]);


        if (resultado.length === 0) {

            return res.status(404).json({
                erro: "Produto não encontrado"
            });

        }


        res.json(resultado[0]);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar produto"
        });

    }

});


/* =================================
   CADASTRAR PRODUTO
================================= */

router.post("/", async (req, res) => {

    try {

        const {
            nome,
            preco,
            codCategoria
        } = req.body;


        if (!nome) {

            return res.status(400).json({
                erro: "Nome do produto é obrigatório"
            });

        }


        const [resultado] = await conexao.query(`

            INSERT INTO produto
            (nome, preco, codCategoria)

            VALUES (?, ?, ?)

        `, [

            nome,
            preco,
            codCategoria

        ]);


        res.status(201).json({

            id: resultado.insertId,

            nome,

            preco,

            codCategoria

        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar produto"
        });

    }

});


/* =================================
   ALTERAR PRODUTO
================================= */

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {
            nome,
            preco,
            codCategoria
        } = req.body;


        const [resultado] = await conexao.query(`

            UPDATE produto

            SET
                nome = ?,
                preco = ?,
                codCategoria = ?

            WHERE id = ?

        `, [

            nome,
            preco,
            codCategoria,
            id

        ]);


        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                erro: "Produto não encontrado"
            });

        }


        res.json({
            mensagem: "Produto atualizado com sucesso"
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao atualizar produto"
        });

    }

});


/* =================================
   EXCLUIR PRODUTO
================================= */

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;


        const [resultado] = await conexao.query(

            "DELETE FROM produto WHERE id = ?",

            [id]

        );


        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                erro: "Produto não encontrado"
            });

        }


        res.json({
            mensagem: "Produto excluído com sucesso"
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao excluir produto"
        });

    }

});


module.exports = router;