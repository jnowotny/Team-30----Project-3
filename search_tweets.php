<?php
session_start();

header("Content-type: application/json");

// allow tweets it to be used by other php scripts
$search_tweets = $_SESSION['search_tweets'];

echo json_encode($search_tweets);

?>