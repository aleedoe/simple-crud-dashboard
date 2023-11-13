<?php

require '../../config.php';

function editForm($data)
{
    // ambil data dari tiap elemen dalam form
    global $conn;
    $mahasiswa_id = $data['mahasiswa_id'];
    $kode_edit = htmlspecialchars($data["kode_edit"]);
    $name_edit = htmlspecialchars($data["name_edit"]);
    $gender_edit = htmlspecialchars($data["gender_edit"]);
    $image_edit = $data["image_edit"];
    $desa_id = $data["desa_id"];
    // $image_profile_lama = htmlspecialchars($data["gambar_lama"]);

    // if ($_FILES['image_profile']['error'] === 4) {
    //     $image_profile = $image_profile_lama;
    // } else {
    //     $image_profile = upload_gambar();
    // }
    $query = "UPDATE data SET  kode='$kode_edit', nama='$name_edit', jenis_kelamin='$gender_edit', image_profile='$image_edit', id_desa='$desa_id' WHERE id='$mahasiswa_id'";
    //var_dump($query);
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}
function editImage()
{
    $file_name = '';
    if (isset($_FILES['image_edit'])) {
        $file_name = $_FILES['image_edit']['name'];
        $file_size = $_FILES['image_edit']['size'];
        $error_file = $_FILES['image_edit']['error'];
        $temporary_file_storage = $_FILES['image_edit']['tmp_name'];

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

$mahasiswa_id = $_POST["mahasiswa_id"];
$old_image = $_POST["old_image"];

$kode_edit = $_POST["kode_edit"];
if (preg_match('/^\s*$/', $kode_edit)) {
    echo "error_value_kode";
    die;
}

// Validasi kode hanya angka
if (!is_numeric($kode_edit)) {
    echo "error_number_kode";
    die;
}

// Validasi panjang kode maksimal 10 digit
if (strlen($kode_edit) > 10) {
    echo "error_length_kode";
    die;
}

$name_edit = $_POST["name_edit"];
if (preg_match('/^\s*$/', $name_edit)) {
    echo "error_value_name";
    die;
}

// Validasi nama hanya boleh 0-9a-zA-Z spasi, max 10 karakter
if (!preg_match('/^[a-zA-Z ]+$/', $name_edit)) {
    echo "error_unique_name";
    die;
}

if (strlen($name_edit) > 15) {
    echo "error_length_name";
    die;
}

$gender_edit = $_POST["gender_edit"];
if (preg_match('/^\s*$/', $gender_edit)) {
    echo "error_gender_value";
    die;
}

if ($gender_edit != "Laki-laki" && $gender_edit != "Perempuan") {
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
if (preg_match('/^\s*$/', $desa_id)) {
    echo "error_value_des";
    die;
}

if (!is_numeric($desa_id)) {
    echo "error_number_kode";
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

$image_edit = isset($_FILES['image_edit']) ? $_FILES['image_edit'] : "";
if ($image_edit != "") {
    $path_to_image = '../../../docs/img/' . $old_image;
    if (file_exists($path_to_image)) {
        unlink($path_to_image);
    }
    $image_edit = editImage();
} else {
    $image_edit = $old_image;
}

// Panggil fungsi tambah() untuk menambahkan data ke database
if (editForm(["mahasiswa_id" => $mahasiswa_id, "old_image" => $old_image, "kode_edit" => $kode_edit, "name_edit" => $name_edit, "gender_edit" => $gender_edit, "image_edit" => $image_edit, "desa_id" => $desa_id])) {
    echo "success_edit_data";
} else {
    echo "failed_edit_data";
}
?>