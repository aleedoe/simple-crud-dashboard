<?php
require '../../config.php';

function provinsiAdd($data) {
    global $conn;
    $provinsi_name = $data["name_add"];

    $query = "INSERT INTO provinsi (id, name)
                VALUES ('', '$provinsi_name')";
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}

if (isset($_POST["name_add"])) {
    $provinsi_name = $_POST["name_add"];
    if (preg_match('/^\s*$/', $provinsi_name)) {
        echo "error_value_name";
        die;
    }

    if (!preg_match('/^[a-zA-Z ]+$/', $provinsi_name)) {
        echo "error_unique_name";
        die;
    }

    if (strlen($provinsi_name) > 20) {
        echo "error_length_name";
        die;
    }

    if (provinsiAdd(["name_add" => $provinsi_name])) {
        echo "data_success";
    } else {
        echo "data_failed";
    }
}
?>