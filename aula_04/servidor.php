<?php
    // Validação: verifica se o parâmetro existe, é numérico e positivo
    if (!isset($_GET["numero"]) || !is_numeric($_GET["numero"]) || intval($_GET["numero"]) <= 0) {
        echo "Número inválido.";
        exit;
    }

    $valor = intval($_GET["numero"]);
    $texto = "";

    for ($i = 1; $i <= $valor; $i++) {
        $texto .= "<br>" . $i;
    }

    echo $texto;
?>
