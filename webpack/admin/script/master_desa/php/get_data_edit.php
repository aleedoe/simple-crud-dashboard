<?php
// relasi ke file fungtions_connect
require '../../config.php';

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    // Ambil data matakuliah berdasarkan id
    $query = "SELECT desa.*, 
	kabupaten.`id` AS id_kabupaten,
	provinsi.`id` AS id_provinsi
FROM desa
	INNER JOIN kecamatan ON desa.`id_kecamatan` = kecamatan.`id`
	INNER JOIN kabupaten ON kecamatan.`id_kabupaten` = kabupaten.`id`
	INNER JOIN provinsi ON kabupaten.`id_provinsi` = provinsi.`id`
WHERE desa.`id` = $id";
    $result = get_data($query);

    // Format respons sebagai JSON
    if (!empty($result)) {
        $response = ["data" => $result];
        echo json_encode($response);
    }
}
?>