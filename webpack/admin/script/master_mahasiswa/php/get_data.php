<?php
require '../../config.php';

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 5;
$offset = ($page - 1) * $limit;
$keyword = isset($_GET['keyword']) ? $_GET['keyword'] : '';
$jenisKelamin = isset($_GET["jenis_kelamin"]) ? $_GET["jenis_kelamin"] : "";
$imageProfile = isset($_GET["image_profile"]) ? $_GET["image_profile"] : "";
$ProvinsiFilter = isset($_GET["provinsiFilter"]) ? $_GET["provinsiFilter"] : "";
$kabupatenFilter = isset($_GET["kabupatenFilter"]) ? $_GET["kabupatenFilter"] : "";
$kecamatanFilter = isset($_GET["kecamatanFilter"]) ? $_GET["kecamatanFilter"] : "";
$desaFilter = isset($_GET["desaFilter"]) ? $_GET["desaFilter"] : "";
$matkulFilter = isset($_GET["matkulFilter"]) ? $_GET["matkulFilter"] : "";

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

if (!empty($keyword)) {
    $query .= " AND (nama LIKE '%$keyword%' OR kode LIKE '%$keyword%')";
}
if (!empty($jenisKelamin)) {
    $query .= " AND jenis_kelamin = '$jenisKelamin'";
}
if ($imageProfile == "YES") {
    $query .= " AND image_profile != ''";
}
if ($imageProfile == "NO") {
    $query .= " AND (image_profile IS NULL OR image_profile = '')";
}
if (!empty($ProvinsiFilter)) {
    $query .= " AND kabupaten.`id_provinsi` = '$ProvinsiFilter'";
}
if (!empty($kabupatenFilter)) {
    $query .= " AND kecamatan.`id_kabupaten` = '$kabupatenFilter'";
}
if (!empty($kecamatanFilter)) {
    $query .= " AND desa.`id_kecamatan` = '$kecamatanFilter'";
}
if (!empty($desaFilter)) {
    $query .= " AND data.`id_desa` = '$desaFilter'";
}
if (!empty($matkulFilter)) {
    $query .= " AND matkul_container.`matkul_name` = '$matkulFilter'";
}

$query .= " GROUP BY data.id";
$query .= " ORDER BY data.nama ASC"; // Menambahkan ORDER BY

// Lakukan query untuk mengambil total data tanpa LIMIT dan OFFSET
$totalData = count(get_data($query));
$totalPages = ceil($totalData / $limit);

$query .= " LIMIT $offset, $limit";

$data = get_data($query);

$titleName = "Tabel Mahasiswa";

$queryNamaMatkul = "SELECT * FROM matkul_name ORDER BY matkul_name.`name` ASC";
$dataMatkul = get_data($queryNamaMatkul);
// Format respons dalam bentuk JSON
$response = [
    "data" => $data,
    "totalPages" => $totalPages,
    "titleName" => $titleName,
    "dataMatkul" => $dataMatkul

];

header("Content-Type: application/json");
echo json_encode($response);

?>