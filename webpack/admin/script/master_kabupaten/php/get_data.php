<?php
require '../../config.php';

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 10;
$offset = ($page - 1) * $limit;

$query = "SELECT 
    kabupaten.*,
    provinsi.`name` AS nama_provinsi,
    COUNT(DISTINCT kecamatan.`id`) AS total_kecamatan,
    COUNT(DISTINCT desa.`id`) AS total_desa,
    COUNT(data.`id`) AS total_data
FROM kabupaten
    LEFT JOIN provinsi ON kabupaten.`id_provinsi` = provinsi.`id`
    LEFT JOIN kecamatan ON kabupaten.`id` = kecamatan.`id_kabupaten`    
    LEFT JOIN desa ON kecamatan.`id` = desa.`id_kecamatan`
    LEFT JOIN DATA ON desa.`id` = data.`id_desa`
GROUP BY kabupaten.`id`
ORDER BY provinsi.name ASC, kabupaten.name ASC
";

$total_data = count(get_data($query));
$total_pages = ceil($total_data / $limit);

$query .= " LIMIT $offset, $limit";

$query_provinsi = "SELECT * FROM provinsi ORDER BY provinsi.`name` ASC";
$data_provinsi = get_data($query_provinsi);

$data = get_data($query);

$response = [
    "data" => $data,
    "total_pages" => $total_pages,
    "dataProvinsi" => $data_provinsi
];

header("Content-Type: application/json");
echo json_encode($response);
?>