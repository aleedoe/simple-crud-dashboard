<?php
// relasi ke file fungtions_connect
require '../../config.php';

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    // Ambil data matakuliah berdasarkan id
    $query = "SELECT kecamatan.*, 
	provinsi.`id` AS id_provinsi
FROM kecamatan
	INNER JOIN kabupaten ON kecamatan.`id_kabupaten` = kabupaten.`id`
	INNER JOIN provinsi ON kabupaten.`id_provinsi` = provinsi.`id`
WHERE kecamatan.`id` = $id";
    $result = get_data($query);

    // Format respons sebagai JSON
    if (!empty($result)) {
        $response = ["data" => $result];
        echo json_encode($response);
    }
}
?>