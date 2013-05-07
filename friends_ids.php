<?php
session_start();

header("Content-type: application/json");

$friends_ids = $_SESSION['friends_ids'];

echo json_encode($friends_ids);

?>