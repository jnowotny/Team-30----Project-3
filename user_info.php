<?php
session_start();

header("Content-type: application/json");

$user_info = $_SESSION['user_info'];

echo json_encode($user_info);

?>