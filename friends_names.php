<?php
session_start();

header("Content-type: application/json");

$friends_names = $_SESSION['friends_names'];

echo json_encode($friends_names);

?>