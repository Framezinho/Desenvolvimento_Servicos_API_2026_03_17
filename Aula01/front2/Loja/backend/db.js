const mysql = require("mysql2/promise");

const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "loja_26_1",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = conexao;