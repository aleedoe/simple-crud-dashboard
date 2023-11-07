<?php
// load_data.php
require '../../config.php';
// Fungsi untuk mengambil data dari database
// Ambil data berdasarkan tabel dan kondisi tertentu
$table = $_GET['table'];
$id = $_GET['id'];
$query = '';

if ($table === 'kabupaten') {
    $query = "SELECT * FROM kabupaten WHERE id_provinsi = $id";
} elseif ($table === 'kecamatan') {
    $query = "SELECT * FROM kecamatan WHERE id_kabupaten = $id";
} elseif ($table === 'desa') {
    $query = "SELECT * FROM desa WHERE id_kecamatan = $id";
} elseif ($table === 'provinsi') {
    $query = "SELECT * FROM provinsi";
}

$data = get_data($query);
echo json_encode($data);
?>