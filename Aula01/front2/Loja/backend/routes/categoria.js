const express = require("express");

const router = express.Router();

const conexao = require("../db");


/* =================================
   LISTAR CATEGORIAS
================================= */

router.get("/", async (req, res) => {

    try {

        const [resultado] = await conexao.query(
            "SELECT * FROM categoria ORDER BY id"
        );

        res.json(resultado);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar categorias"
        });

    }

});


/* =================================
   BUSCAR CATEGORIA POR ID
================================= */

router.get("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const [resultado] = await conexao.query(
            "SELECT * FROM categoria WHERE id = ?",
            [id]
        );


        if (resultado.length === 0) {

            return res.status(404).json({
                erro: "Categoria não encontrada"
            });

        }


        res.json(resultado[0]);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar categoria"
        });

    }

});


/* =================================
   CADASTRAR CATEGORIA
================================= */

router.post("/", async (req, res) => {

    try {

        const { nome } = req.body;


        if (!nome) {

            return res.status(400).json({
                erro: "Nome da categoria é obrigatório"
            });

        }


        const [resultado] = await conexao.query(

            "INSERT INTO categoria (nome) VALUES (?)",

            [nome]

        );


        res.status(201).json({

            id: resultado.insertId,

            nome: nome

        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar categoria"
        });

    }

});


/* =================================
   ALTERAR CATEGORIA
================================= */

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const { nome } = req.body;


        const [resultado] = await conexao.query(

            "UPDATE categoria SET nome = ? WHERE id = ?",

            [nome, id]

        );


        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                erro: "Categoria não encontrada"
            });

        }


        res.json({
            mensagem: "Categoria atualizada com sucesso"
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao atualizar categoria"
        });

    }

});


/* =================================
   EXCLUIR CATEGORIA
================================= */

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;


        const [resultado] = await conexao.query(

            "DELETE FROM categoria WHERE id = ?",

            [id]

        );


        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                erro: "Categoria não encontrada"
            });

        }


        res.json({
            mensagem: "Categoria excluída com sucesso"
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Não foi possível excluir a categoria"
        });

    }

});


module.exports = router;