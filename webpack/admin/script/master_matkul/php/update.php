<?php
// relasi ke file fungtions_connect
require '../fungtions.php';

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

if (isset($_POST["id"]) && isset($_POST["nama_matkul"])) {
    $id = $_POST["id"];
    $matkul_name = $_POST["nama_matkul"];

    // Panggil fungsi edit_Data_matkul() untuk mengupdate data di database
    if (edit_Data_matkul(["id" => $id, "nama_matkul" => $matkul_name])) {
        echo "Data berhasil diupdate.";
    } else {
        echo "Gagal mengupdate data.";
    }
}
?>