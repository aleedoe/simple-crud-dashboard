<?php
// relasi ke file fungtions_connect
require '../../config.php';

function hapus_matkul($id)
{
    global $conn;

    $query = "SELECT matkul_name.*, COUNT(matkul_container.matkul_name) 
            AS total_rows FROM matkul_name LEFT JOIN matkul_container 
            ON matkul_name.id = matkul_container.matkul_name 
            WHERE matkul_name.id ='$id' GROUP BY matkul_name.id;";

    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);

    // cek apakah matkul sudah terpakai atau belum
    if ($row["total_rows"] == 0) {
        $hapus = "DELETE FROM matkul_name WHERE id=$id";
        mysqli_query($conn, $hapus);
        return true;
    } else {
        return false;
    }
}

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    if (hapus_matkul($id)) {
        echo 'success';
    } else {
        echo 'failed';
    }
}
?>