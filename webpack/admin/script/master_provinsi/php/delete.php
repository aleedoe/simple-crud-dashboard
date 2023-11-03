<?php
// relasi ke file fungtions_connect
require '../../config.php';

function hapus($id) {

    global $conn;
    $query = "DELETE FROM provinsi WHERE id='$id'";
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}

if (isset($_GET["id"])) {
    $id = $_GET["id"];

    if (hapus($id)) {
        echo 'success';
    } else {
        echo 'failed';
    }
}
?>