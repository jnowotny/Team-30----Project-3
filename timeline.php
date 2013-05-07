<?php
require("twitteroauth.php");
session_start();
header("Content-type: application/json");
$twitteroauth = $_SESSION['twitteroauth'];

$timeline = $twitteroauth->get('statuses/home_timeline', array('count' => '800', 'include_entities' => 'true'));
//$_SESSION['timeline'] = $timeline;

//$timeline = $_SESSION['timeline'];

echo json_encode($timeline);
?>