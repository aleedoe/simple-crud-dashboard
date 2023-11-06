<?php

require '../../config.php';

function addForm($data)
{
    global $conn;
    $kecamatan = $data['kecamatan_id'];
    $desa = $data['name_add'];
    $query = "INSERT INTO desa (id_kecamatan, name)
                VALUES ('$kecamatan','$desa')";
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}

$name_add = $_POST["name_add"];
if ($name_add == "") {
    echo "error_value_name";
    die;
}

// Validasi nama hanya boleh 0-9a-zA-Z spasi, max 10 karakter
if (preg_match('/[^\w\s]/', $name_add)) {
    echo "error_unique_name";
    die;
}

if (strlen($name_add) > 25) {
    echo "error_length_name";
    die;
}

$provinsi_id = $_POST["provinsi_id"];
$kabupaten_id = $_POST["kabupaten_id"];
$kecamatan_id = $_POST["kecamatan_id"];
if ($provinsi_id == "") {
    echo "error_value_prov";
    die;
}
if ($kabupaten_id == "") {
    echo "error_value_kab";
    die;
}
if ($kecamatan_id == "") {
    echo "error_value_kec";
    die;
}

// Validasi kode hanya angka
if (!is_numeric($provinsi_id)) {
    echo "error_number_kode";
    die;
}

// Validasi panjang kode maksimal 10 digit
if (strlen($provinsi_id) > 10) {
    echo "error_length_kode";
    die;
}

// Validasi kode hanya angka
if (!is_numeric($kabupaten_id)) {
    echo "error_number_kode";
    die;
}

// Validasi panjang kode maksimal 10 digit
if (strlen($kabupaten_id) > 10) {
    echo "error_length_kode";
    die;
}

// Validasi kode hanya angka
if (!is_numeric($kecamatan_id)) {
    echo "error_number_kode";
    die;
}

// Validasi panjang kode maksimal 10 digit
if (strlen($kecamatan_id) > 10) {
    echo "error_length_kode";
    die;
}

// Fungsi untuk memeriksa apakah ID ada dalam database
function isIdExist($table_name, $id)
{
    global $conn;
    $query = "SELECT id FROM $table_name WHERE id = $id";
    $result = mysqli_query($conn, $query);
    return mysqli_num_rows($result) > 0;
}

// Fungsi untuk memeriksa relasi antara tabel-tabel dalam database
function isValidAddress($provinsi_id, $kabupaten_id, $kecamatan_id)
{
    global $conn;
    $query = "SELECT COUNT(*) AS total FROM kabupaten
            WHERE id = $kabupaten_id AND id_provinsi = $provinsi_id";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    if ($row["total"] === "0") {
        return false;
    }

    $query = "SELECT COUNT(*) AS total FROM kecamatan
            WHERE id = $kecamatan_id AND id_kabupaten = $kabupaten_id";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    if ($row["total"] === "0") {
        return false;
    }

    return true;
}

// Memeriksa apakah ID Provinsi, Kabupaten, Kecamatan, dan Desa ada dalam database
if (
    !isIdExist('provinsi', $provinsi_id) ||
    !isIdExist('kabupaten', $kabupaten_id) ||
    !isIdExist('kecamatan', $kecamatan_id)
) {
    echo "address_not_found";
    die;
}

// Memeriksa relasi antara tabel-tabel alamat
if (!isValidAddress($provinsi_id, $kabupaten_id, $kecamatan_id)) {
    echo "address_not_found";
    die;
}

// Panggil fungsi tambah() untuk menambahkan data ke database
if (addForm(["name_add" => $name_add, "kecamatan_id" => $kecamatan_id])) {
    echo "success_add_data";
} else {
    echo "failed_add_data";
}
?>