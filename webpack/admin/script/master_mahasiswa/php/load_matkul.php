<?php 
require '../../config.php';

$query_matkul_name = "SELECT * FROM matkul_name ORDER BY matkul_name.`name` ASC";
$data_matkul = get_data($query_matkul_name);

$response = ["dataMatkul" => $data_matkul];

header("Content-Type: application/json");
echo json_encode($response);

?>