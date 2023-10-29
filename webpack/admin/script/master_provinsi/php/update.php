<?php
// relasi ke file fungtions_connect
require '../../config.php';

function edit_Data_provinsi($data)
{
    // ambil data dari tiap elemen dalam form
    global $conn;
    $id = $data['id'];
    $provinsi_name = $data["nama_provinsi"];

    $query = "UPDATE provinsi SET name='$provinsi_name' WHERE id='$id'";
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}

if (isset($_POST["matkul_id"]) && isset($_POST["name_edit"])) {
    $id = $_POST["matkul_id"];
    $provinsi_name = $_POST["name_edit"];
    if ($provinsi_name == "") {
        echo "error_value_name";
        die;
    }

    if (preg_match('/[^\w\s\.]/', $provinsi_name)) {
        echo "error_unique_name";
        die;
    }

    if (strlen($provinsi_name) > 20) {
        echo "error_length_name";
        die;
    }

    // Panggil fungsi edit_Data_provinsi() untuk mengupdate data di database
    if (edit_Data_provinsi(["id" => $id, "nama_provinsi" => $provinsi_name])) {
        echo "success";
    } else {
        echo "failed";
    }
}
?>