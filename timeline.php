<?php
require("twitteroauth.php");
session_start();
header("Content-type: application/json");
$twitteroauth = $_SESSION['twitteroauth'];

//grabs the home timeline for the the logged in user
$timeline = $twitteroauth->get('statuses/home_timeline', array('count' => '800', 'include_entities' => 'true'));

echo json_encode($timeline);
?>