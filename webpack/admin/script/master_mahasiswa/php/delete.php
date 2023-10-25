<?php
// relasi ke file fungtions_connect
require '../../config.php';

$id = $_GET["id"];

function deleteData($id)
{
    global $conn;
    $student_id = $id;
    $fetch = get_data("SELECT * FROM data WHERE id=$student_id")[0];

    $image_profile = $fetch['image_profile'];

    // Menghapus image yang ada di dalam file explorer
    $path_to_image = '../../../docs/img/' . $image_profile; // Ganti dengan path yang sesuai

    if (file_exists($path_to_image) && is_file($path_to_image)) {
        unlink($path_to_image);
    }

    $delete = "DELETE FROM data WHERE id=$student_id";
    $kontainer_delete = "DELETE FROM matkul_container WHERE data_id=$student_id";
    mysqli_query($conn, $delete);
    mysqli_query($conn, $kontainer_delete);
    return mysqli_affected_rows($conn);
}

deleteData($id)
?>