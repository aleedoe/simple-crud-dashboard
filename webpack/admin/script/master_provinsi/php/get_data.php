<?php
require '../../config.php';

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 5;
$offset = ($page - 1) * $limit;

$query = "SELECT 
    provinsi.*,
    COUNT(DISTINCT kabupaten.`id`) AS total_kabupaten,
    COUNT(DISTINCT kecamatan.`id`) AS total_kecamatan,
    COUNT(DISTINCT desa.`id`) AS total_desa,
    COUNT(data.`id`) AS total_data
FROM provinsi
    LEFT JOIN kabupaten ON provinsi.`id` = kabupaten.`id_provinsi`
    LEFT JOIN kecamatan ON kabupaten.`id` = kecamatan.`id_kabupaten`
    LEFT JOIN desa ON kecamatan.`id` = desa.`id_kecamatan`
    LEFT JOIN DATA ON desa.`id` = data.`id_desa`
GROUP BY
    provinsi.`id`
ORDER BY
    provinsi.name ASC";

$total_data = count(get_data($query));
$total_pages = ceil($total_data / $limit);

$query .= " LIMIT $offset, $limit";

$data = get_data($query);

$response = [
    "data" => $data,
    "total_pages" => $total_pages
];

header("Content-Type: application/json");
echo json_encode($response);
?>