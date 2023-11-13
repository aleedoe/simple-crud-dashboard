<?php

require '../../config.php';

function editForm($data)
{
    // ambil data dari tiap elemen dalam form
    global $conn;
    $id = $data['id'];
    $kabupaten_name = $data["nama_kabupaten"];

    $query = "UPDATE kabupaten SET name='$kabupaten_name' WHERE id='$id'";
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}

$id = $_POST["kabupaten_id"];

$kabupaten_edit = $_POST["name_edit"];
if (preg_match('/^\s*$/', $kabupaten_edit)) {
    echo "error_value_name";
    die;
}

// Validasi nama hanya boleh 0-9a-zA-Z spasi, max 10 karakter
if (!preg_match('/^[a-zA-Z ]+$/', $kabupaten_edit)) {
    echo "error_unique_name";
    die;
}

if (strlen($kabupaten_edit) > 25) {
    echo "error_length_name";
    die;
}

$provinsi_id = $_POST["provinsi_id"];
if ($provinsi_id == "") {
    echo "error_value_prov";
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

// Fungsi untuk memeriksa apakah ID ada dalam database
function isIdExist($table_name, $id)
{
    global $conn;
    $query = "SELECT id FROM $table_name WHERE id = $id";
    $result = mysqli_query($conn, $query);
    return mysqli_num_rows($result) > 0;
}

// Memeriksa apakah ID Provinsi, Kabupaten, Kecamatan, dan Desa ada dalam database
if (
    !isIdExist('provinsi', $provinsi_id)
) {
    echo "address_not_found";
    die;
}

// Panggil fungsi tambah() untuk menambahkan data ke database
if (editForm(["id" => $id, "nama_kabupaten" => $kabupaten_edit])) {
    echo "success_edit_data";
} else {
    echo "failed_edit_data";
}
?>