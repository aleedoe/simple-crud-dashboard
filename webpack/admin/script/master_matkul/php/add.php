<?php
require '../../config.php';

function matkulAdd($data) {
    global $conn;
    $matkul_name = $data["name_add"];


    $query = "INSERT INTO matkul_name (id, name)
                VALUES ('', '$matkul_name')";
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}

if (isset($_POST["name_add"])) {
    $matkul_name = $_POST["name_add"];
    if (preg_match('/^\s*$/',$matkul_name)) {
        echo "error_value_name";
        die;
    }

    if (!preg_match('/^[a-zA-Z ]+$/', $matkul_name)) {
        echo "error_unique_name";
        die;
    }

    if (strlen($matkul_name) > 20) {
        echo "error_length_name";
        die;
    }

    if (matkulAdd(["name_add" => $matkul_name])) {
        echo "data_success";
    } else {
        echo "data_failed";
    }
}
?>