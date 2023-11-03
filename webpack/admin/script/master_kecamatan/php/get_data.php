<?php
require '../../config.php';

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 10;
$offset = ($page - 1) * $limit;

$query = "SELECT 
    kc.*,
    kab.`name` AS nama_kabupaten,
    prov.`name` AS nama_provinsi,
    COUNT(DISTINCT desa.`id`) AS total_desa,
    COUNT(data.`id`) AS total_data,
    prov.`id` AS id_provinsi
FROM kecamatan AS kc
	LEFT JOIN kabupaten AS kab ON kc.`id_kabupaten` = kab.`id`
	LEFT JOIN provinsi AS prov ON kab.`id_provinsi` = prov.`id`
	LEFT JOIN desa ON kc.`id` = desa.`id_kecamatan`
	LEFT JOIN DATA ON desa.`id` = data.`id_desa`
GROUP BY kc.`id`
ORDER BY prov.name ASC, kc.name ASC
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