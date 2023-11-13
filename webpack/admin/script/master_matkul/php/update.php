<?php
// relasi ke file fungtions_connect
require '../../config.php';

function edit_Data_matkul($data)
{
    // ambil data dari tiap elemen dalam form
    global $conn;
    $id = $data['id'];
    $matkul_name = $data["nama_matkul"];

    $query = "UPDATE matkul_name SET name='$matkul_name' WHERE id='$id'";
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}

if (isset($_POST["matkul_id"]) && isset($_POST["name_edit"])) {
    $id = $_POST["matkul_id"];
    $matkul_name = $_POST["name_edit"];
    if (preg_match('/^\s*$/',$matkul_name)) {
        echo "error_value_name";
        die;
    }

    if (!preg_match('/^[a-zA-Z ]+$/', $matkul_name)) {
        echo "error_unique_name";
        die;
    }

    if (strlen($matkul_name) > 20) {
        echo "error_length_name";
        die;
    }

    // Panggil fungsi edit_Data_matkul() untuk mengupdate data di database
    if (edit_Data_matkul(["id" => $id, "nama_matkul" => $matkul_name])) {
        echo "success";
    } else {
        echo "failed";
    }
}
?>