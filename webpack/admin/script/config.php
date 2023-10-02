<?php

$conn = mysqli_connect("localhost", "alie", "kmzway76aa", "contoh_database");

function get_data($query)
{
    global $conn;
    $result = mysqli_query($conn, $query);
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    return $rows;
}
?>