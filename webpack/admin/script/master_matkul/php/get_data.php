<?php
require '../../config.php';

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 5;
$offset = ($page - 1) * $limit;

$query = "SELECT 
    matkul_name.id,
    matkul_name.name,
    COUNT(matkul_container.`matkul_name`) AS jumlah_pengambil
FROM 
    matkul_name
LEFT JOIN 
    matkul_container ON matkul_name.id = matkul_container.`matkul_name`
GROUP BY 
    matkul_name.id, matkul_name.name
ORDER BY
    matkul_name.name ASC";

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