<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$db   = "loja_26_1";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["erro" => "Falha na conexão: " . $conn->connect_error]);
    exit;
}

// BUSCAR produtos
if (isset($_GET['buscar'])) {
    $result = $conn->query("SELECT * FROM produto");
    $produtos = [];
    while ($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }
    echo json_encode(["produtos" => $produtos]);
}

// EXCLUIR produto
elseif (isset($_GET['excluir']) && isset($_GET['idProduto'])) {
    $id = intval($_GET['idProduto']);
    $stmt = $conn->prepare("DELETE FROM produto WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["resposta" => "Produto excluído com sucesso!"]);
    } else {
        echo json_encode(["resposta" => "Erro ao excluir: " . $conn->error]);
    }
}

// INSERIR produto
elseif (isset($_GET['inserir'])) {
    $nome  = $conn->real_escape_string($_POST['name'] ?? '');
    $preco = floatval($_POST['price'] ?? 0);

    if (empty($nome) || $preco <= 0) {
        echo json_encode(["resposta" => "Nome e preço são obrigatórios."]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO produto (nome, preco) VALUES (?, ?)");
    $stmt->bind_param("sd", $nome, $preco);
    if ($stmt->execute()) {
        echo json_encode([
            "resposta" => "Produto inserido com sucesso!",
            "id" => $conn->insert_id
        ]);
    } else {
        echo json_encode(["resposta" => "Erro ao inserir: " . $conn->error]);
    }
}

else {
    echo json_encode(["erro" => "Ação não reconhecida."]);
}

$conn->close();
?>
