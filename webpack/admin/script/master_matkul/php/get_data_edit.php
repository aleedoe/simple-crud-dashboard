<?php
// relasi ke file fungtions_connect
require '../../config.php';

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    // Ambil data matakuliah berdasarkan id
    $query = "SELECT * FROM matkul_name WHERE id = $id";
    $result = get_data($query);

    // Format respons sebagai JSON
    if (!empty($result)) {
        $response = ["data" => $result];
        echo json_encode($response);
    }
}
?>