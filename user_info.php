<?php
session_start();

header("Content-type: application/json");

//gets the user_info from twitter_oauth.php and echos out for future use
$user_info = $_SESSION['user_info'];

echo json_encode($user_info);

?>