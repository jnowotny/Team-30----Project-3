<?php
session_start();

header("Content-type: application/json");

$search_tweets = $_SESSION['search_tweets'];

echo json_encode($search_tweets);

?>