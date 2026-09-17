const express = require("express");
const cors = require("cors");

const produtoRoutes = require("./routes/produto");
const categoriaRoutes = require("./routes/categoria");

const app = express();

const PORT = 8001;


/* ============================
   MIDDLEWARES
============================ */

app.use(cors());

app.use(express.json());


/* ============================
   ROTAS
============================ */

app.use("/produto", produtoRoutes);

app.use("/categoria", categoriaRoutes);


/* ============================
   ROTA INICIAL
============================ */

app.get("/", (req, res) => {

    res.json({
        mensagem: "API da Loja funcionando!"
    });

});


/* ============================
   INICIAR SERVIDOR
============================ */

app.listen(PORT, () => {

    console.log(`
=================================
 API DA LOJA
=================================

Servidor:
http://localhost:${PORT}

Banco:
loja_26_1

=================================
    `);

});