<?php
// relasi ke file fungtions_connect
require '../../config.php';

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    // Ambil data matakuliah berdasarkan id
    $query = "SELECT
	data.`id`,
	data.`kode`,
	data.`nama`,
	data.`jenis_kelamin`,
	data.`image_profile`,
	data.`id_desa`,
	desa.`id` AS id_desa,
	kecamatan.`id` AS id_kecamatan,
	kabupaten.`id` AS id_kabupaten,
	provinsi.`id` AS id_provinsi
FROM DATA
	INNER JOIN desa ON desa.`id` = data.`id_desa`
	INNER JOIN kecamatan ON kecamatan.`id` = desa.`id_kecamatan`
	INNER JOIN kabupaten ON kabupaten.`id` = kecamatan.`id_kabupaten`
	INNER JOIN provinsi ON provinsi.`id` = kabupaten.`id_provinsi`
WHERE data.`id` ='$id'";
    $result = get_data($query);

    // Format respons sebagai JSON
    if (!empty($result)) {
        $response = ["data" => $result];
        echo json_encode($response);
    }
}
?>