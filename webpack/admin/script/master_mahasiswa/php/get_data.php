<?php
require '../../config.php';

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 5;
$offset = ($page - 1) * $limit;
$keyword_filter = isset($_GET['keyword_filter']) ? $_GET['keyword_filter'] : '';
$gender_filter = isset($_GET["gender_filter"]) ? $_GET["gender_filter"] : "";
$image_filter = isset($_GET["image_filter"]) ? $_GET["image_filter"] : "";
$provinsi_filter = isset($_GET["provinsi_filter"]) ? $_GET["provinsi_filter"] : "";
$kabupaten_filter = isset($_GET["kabupaten_filter"]) ? $_GET["kabupaten_filter"] : "";
$kecamatan_filter = isset($_GET["kecamatan_filter"]) ? $_GET["kecamatan_filter"] : "";
$desa_filter = isset($_GET["desa_filter"]) ? $_GET["desa_filter"] : "";
$matkul_filter = isset($_GET["matkul_filter"]) ? $_GET["matkul_filter"] : "";

$query = "SELECT
    data.`id` AS id_personal_name,
    data.`kode`,
    data.`nama`,
    data.`jenis_kelamin`,
    data.`image_profile`,
    (SELECT COUNT(mc.`id`) FROM matkul_container mc WHERE data.`id` = mc.`data_id`) AS total_rows,    
    data.`id_desa`,
    desa.`name` AS nama_desa,
    desa.`id_kecamatan`,
    kecamatan.`name` AS nama_kecamatan,
    kecamatan.`id_kabupaten`,
    kabupaten.`name` AS nama_kabupaten,
    kabupaten.`id_provinsi`,
    provinsi.`name` AS nama_provinsi
FROM DATA
    LEFT JOIN matkul_container ON data.`id` = matkul_container.`data_id`
    INNER JOIN desa ON desa.`id` = data.`id_desa`
    INNER JOIN kecamatan ON kecamatan.`id` = desa.`id_kecamatan`
    INNER JOIN kabupaten ON kabupaten.`id` = kecamatan.`id_kabupaten`
    INNER JOIN provinsi ON provinsi.`id` = kabupaten.`id_provinsi`
WHERE TRUE
"; // Sisipkan query Anda di sini

if (!empty($keyword_filter)) {
    $query .= " AND (nama LIKE '%$keyword_filter%' OR kode LIKE '%$keyword_filter%')";
}
if (!empty($gender_filter)) {
    $query .= " AND jenis_kelamin = '$gender_filter'";
}
if ($image_filter == "YES") {
    $query .= " AND image_profile != ''";
}
if ($image_filter == "NO") {
    $query .= " AND (image_profile IS NULL OR image_profile = '')";
}
if (!empty($provinsi_filter)) {
    $query .= " AND kabupaten.`id_provinsi` = '$provinsi_filter'";
}
if (!empty($kabupaten_filter)) {
    $query .= " AND kecamatan.`id_kabupaten` = '$kabupaten_filter'";
}
if (!empty($kecamatan_filter)) {
    $query .= " AND desa.`id_kecamatan` = '$kecamatan_filter'";
}
if (!empty($desa_filter)) {
    $query .= " AND data.`id_desa` = '$desa_filter'";
}
if (!empty($matkul_filter)) {
    $query .= " AND matkul_container.`matkul_name` = '$matkul_filter'";
}

$query .= " GROUP BY data.id";
$query .= " ORDER BY data.nama ASC"; // Menambahkan ORDER BY

// Lakukan query untuk mengambil total data tanpa LIMIT dan OFFSET
$total_data = count(get_data($query));
$total_pages = ceil($total_data / $limit);

$query .= " LIMIT $offset, $limit";

$data = get_data($query);


$query_matkul_name = "SELECT * FROM matkul_name ORDER BY matkul_name.`name` ASC";
$data_matkul = get_data($query_matkul_name);

$query_provinsi = "SELECT * FROM provinsi ORDER BY provinsi.`name` ASC";
$data_provinsi = get_data($query_provinsi);
// Format respons dalam bentuk JSON
$response = [
    "data" => $data,
    "totalPages" => $total_pages,
    "dataMatkul" => $data_matkul,
    "dataProvinsi" => $data_provinsi

];

header("Content-Type: application/json");
echo json_encode($response);

?>