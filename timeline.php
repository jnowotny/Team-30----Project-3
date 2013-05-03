<?php
session_start();

header("Content-type: application/json");

$timeline = $_SESSION['timeline'];

echo json_encode($timeline);

?>