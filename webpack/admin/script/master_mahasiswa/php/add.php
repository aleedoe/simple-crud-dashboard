<?php

require '../../config.php';

function addForm($data)
{
    // ambil data dari tiap elemen dalam form
    global $conn;
    $kode_add = htmlspecialchars($data["kode_add"]);
    $name_add = htmlspecialchars($data["name_add"]);
    $gender_add = htmlspecialchars($data["gender_add"]);
    $desa_id = $data["desa_id"];
    $image_add = $data["image_add"];

    // File yang diupload bukan gambar
    if ($image_add === false) {
        echo "image_failed_upload";
        return false;
    }

    $query = "INSERT INTO data (kode, nama, jenis_kelamin, image_profile, id_desa)
                VALUES ('$kode_add', '$name_add', '$gender_add', '$image_add', '$desa_id')";
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}
function addImage()
{
    $file_name = '';
    if (isset($_FILES['image_add'])) {
        $file_name = $_FILES['image_add']['name'];
        $file_size = $_FILES['image_add']['size'];
        $error_file = $_FILES['image_add']['error'];
        $temporary_file_storage = $_FILES['image_add']['tmp_name'];

        // Cek apakah yang diupload adalah gambar
        $Valid_Image_extension = ['jpg', 'jpeg', 'png'];
        $Image_extension = explode('.', $file_name);
        $Image_extension = strtolower(end($Image_extension));

        // Mengecek apakah file yang diupload adalah gambar
        if (!empty($file_name)) {
            if (!in_array($Image_extension, $Valid_Image_extension)) {
                echo "image_failed_not_file";
                return false;
            } else if ($file_size > 1000000) {
                echo "image_failed_size";
                return false;
            }

            // generate nama gambar baru 
            $new_file_name = uniqid();
            $new_file_name .= '.';
            $new_file_name .= $Image_extension;
            
            move_uploaded_file($temporary_file_storage, '../../../docs/img/' . $new_file_name);
            return $new_file_name; // atau path file gambar yang disimpan
        }
    }

    return $file_name;
}

$kode_add = $_POST["kode_add"];
if ($kode_add == "") {
    echo "error_value_kode";
    die;
}

// Validasi kode hanya angka
if (!is_numeric($kode_add)) {
    echo "error_number_kode";
    die;
}

// Validasi panjang kode maksimal 10 digit
if (strlen($kode_add) > 10) {
    echo "error_length_kode";
    die;
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

if (strlen($name_add) > 10) {
    echo "error_length_name";
    die;
}

$gender_add = $_POST["gender_add"];
if ($gender_add == "") {
    echo "error_gender_value";
    die;
}

if ($gender_add != "Laki-laki" && $gender_add != "Perempuan") {
    echo "error_gender_species";
    die;
}

$provinsi_id = $_POST["provinsi_id"];
$kabupaten_id = $_POST["kabupaten_id"];
$kecamatan_id = $_POST["kecamatan_id"];
$desa_id = $_POST["desa_id"];
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
if ($desa_id == "") {
    echo "error_value_des";
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
function isValidAddress($provinsi_id, $kabupaten_id, $kecamatan_id, $desa_id)
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

    $query = "SELECT COUNT(*) AS total FROM desa
            WHERE id = $desa_id AND id_kecamatan = $kecamatan_id";
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
    !isIdExist('kecamatan', $kecamatan_id) ||
    !isIdExist('desa', $desa_id)
) {
    echo "address_not_found";
    die;
}

// Memeriksa relasi antara tabel-tabel alamat
if (!isValidAddress($provinsi_id, $kabupaten_id, $kecamatan_id, $desa_id)) {
    echo "address_not_found";
    die;
}

$image_add = isset($_FILES['image_add']) ? $_FILES['image_add'] : "";
if ($image_add != "") {
    $image_add = addImage();
    if (!$image_add) {
        // echo "error_upload_image";
        die;
    }
}

// Panggil fungsi tambah() untuk menambahkan data ke database
if (addForm(["kode_add" => $kode_add, "name_add" => $name_add, "gender_add" => $gender_add, "image_add" => $image_add, "desa_id" => $desa_id])) {
    echo "success_add_data";
} else {
    echo "failed_add_data";
}
?>