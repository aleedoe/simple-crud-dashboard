<?php
require '../../config.php';

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 5;
$offset = ($page - 1) * $limit;

$query = "SELECT 
    des.*,
    kc.`name` AS nama_kecamatan,
    kab.`id` AS id_kabupaten,
    kab.`name` AS nama_kabupaten,
    prov.`id` AS id_provinsi,
    prov.`name` AS nama_provinsi,
    COUNT(data.`id`) AS total_data
FROM desa AS des
    LEFT JOIN kecamatan AS kc ON des.`id_kecamatan` = kc.`id`
    LEFT JOIN kabupaten AS kab ON kc.`id_kabupaten` = kab.`id`
    LEFT JOIN provinsi AS prov ON kab.`id_provinsi` = prov.`id`
    LEFT JOIN DATA ON des.`id` = data.`id_desa`
GROUP BY des.`id`";

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