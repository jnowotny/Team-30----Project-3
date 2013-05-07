<?php
require("twitteroauth.php");
session_start();
header("Content-type: application/json");
$twitteroauth = $_SESSION['twitteroauth'];

$con = mysqli_connect("mysql7.000webhost.com","a9710941_jnowot","sm0key","a9710941_db");
// Check connection
if (mysqli_connect_errno())
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
$teamTweets = array();
$exists_query = "SELECT * FROM twitterMLB";
$result = mysqli_query($con, $exists_query);
while($row = mysqli_fetch_array($result)) {
    $team_name = $row['HANDLE'];
    $tweet = $twitteroauth->get('statuses/user_timeline', array('count' => '1', 'screen_name' => $team_name, 'include_entities' => 'true'));
    array_push($teamTweets, $tweet);
}
mysqli_close($con);
echo json_encode($teamTweets);
?>