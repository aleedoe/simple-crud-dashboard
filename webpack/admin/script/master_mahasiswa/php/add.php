<?php

require '../../config.php';

$kode_add = $_POST["kode_add"];
if ($kode_add == "") {
    echo "Harap isi bagian kode.";
    die;
}

// Validasi kode hanya angka
if (!is_numeric($kode_add)) {
    echo "Kode harus berupa angka.";
    die;
}

// Validasi panjang kode maksimal 10 digit
if (strlen($kode_add) > 10) {
    echo "Kode terlalu panjang. Maksimal 10 digit.";
    die;
}

$nama = $_POST["nama"];
if ($nama == "") {
    echo "Harap isi bagian nama.";
    die;
}

// Validasi nama hanya boleh 0-9a-zA-Z spasi, max 10 karakter
if (preg_match('/[^\w\s]/', $nama)) {
    echo "Nama tidak diperbolehkan mengandung karakter unik.";
    die;
}

if (strlen($nama) > 10) {
    echo "Nama terlalu panjang. Maksimal 10 karakter.";
    die;
}

$jenis_kelamin = $_POST["jenis_kelamin"];
if ($jenis_kelamin == "") {
    echo "Harap isi bagian jenis kelamin.";
    die;
}

if ($jenis_kelamin != "Laki-laki" && $jenis_kelamin != "Perempuan") {
    echo "Jenis kelamin tidak terdefinisi.";
    die;
}

$idProvinsi = $_POST["idProvinsi"];
$idKabupaten = $_POST["idKabupaten"];
$idKecamatan = $_POST["idKecamatan"];
$idDesa = $_POST["idDesa"];
if ($idProvinsi == "") {
    echo "Harap isi bagian provinsi.";
    die;
}
if ($idKabupaten == "") {
    echo "Harap isi bagian kabupaten.";
    die;
}
if ($idKecamatan == "") {
    echo "Harap isi bagian kecamatan.";
    die;
}
if ($idDesa == "") {
    echo "Harap isi bagian desa.";
    die;
}

// Fungsi untuk memeriksa apakah ID ada dalam database
function isIdExist($tableName, $id)
{
    global $conn;
    $query = "SELECT id FROM $tableName WHERE id = $id";
    $result = mysqli_query($conn, $query);
    return mysqli_num_rows($result) > 0;
}

// Fungsi untuk memeriksa relasi antara tabel-tabel dalam database
function isValidAddress($idProvinsi, $idKabupaten, $idKecamatan, $idDesa)
{
    global $conn;
    $query = "SELECT COUNT(*) AS total FROM kabupaten
            WHERE id = $idKabupaten AND id_provinsi = $idProvinsi";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    if ($row["total"] === "0") {
        return false;
    }

    $query = "SELECT COUNT(*) AS total FROM kecamatan
            WHERE id = $idKecamatan AND id_kabupaten = $idKabupaten";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    if ($row["total"] === "0") {
        return false;
    }

    $query = "SELECT COUNT(*) AS total FROM desa
            WHERE id = $idDesa AND id_kecamatan = $idKecamatan";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    if ($row["total"] === "0") {
        return false;
    }

    return true;
}

// Memeriksa apakah ID Provinsi, Kabupaten, Kecamatan, dan Desa ada dalam database
if (
    !isIdExist('provinsi', $idProvinsi) ||
    !isIdExist('kabupaten', $idKabupaten) ||
    !isIdExist('kecamatan', $idKecamatan) ||
    !isIdExist('desa', $idDesa)
) {
    echo "Alamat tidak tersedia.";
    die;
}

// Memeriksa relasi antara tabel-tabel alamat
if (!isValidAddress($idProvinsi, $idKabupaten, $idKecamatan, $idDesa)) {
    echo "Alamat tidak sesuai.";
    die;
}

$image_profile = isset($_FILES['image_profile']) ? $_FILES['image_profile'] : "";
if ($image_profile != "") {
    $image_profile = upload_gambar();
    if (!$image_profile) {
        echo "Gagal mengupload gambar profil.";
        die;
    }
}

// Panggil fungsi tambah() untuk menambahkan data ke database
if (tambah(["kode" => $kode, "nama" => $nama, "jenis_kelamin" => $jenis_kelamin, "image_profile" => $image_profile, "idDesa" => $idDesa])) {
    echo "Data berhasil ditambahkan.";
} else {
    echo "Gagal menambahkan data.";
}
?>