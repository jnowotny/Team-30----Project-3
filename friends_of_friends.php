<?php
session_start();

header("Content-type: application/json");

$friends_of_friends = $_SESSION['friends_of_friends'];

echo json_encode($friends_of_friends);

?>