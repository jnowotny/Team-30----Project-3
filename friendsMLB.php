<?php
include('simple_html_dom.php');
//header("Content-type: application/json");
//require("twitteroauth.php");
session_start();
/*
if(!empty($_GET['oauth_verifier']) && !empty($_SESSION['oauth_token']) && !empty($_SESSION['oauth_token_secret'])){
$twitteroauth = new TwitterOAuth('mBbU4Bo5Topp6VEwrLM8ow', 'YqJiwzcj4olqP14hjvzcz5CHqkmvvGurINd6UKbiwOs', $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
//$team_name = $_POST['variable'];

ob_start();
require 'user_info.php';
$screen_name = ob_get_clean()->screen_name;
*/
$con = mysqli_connect("mysql7.000webhost.com","a9710941_jnowot","sm0key","a9710941_db");
// Check connection
if (mysqli_connect_errno())
    echo "Failed to connect to MySQL: " . mysqli_connect_error();

$exists_query = "SELECT FRIENDS FROM Users WHERE NAME = 'jnowotny'";
$result = mysqli_query($con, $exists_query);
$row = mysqli_fetch_array($result);
$friends_array = explode(",", $row['FRIENDS']);
$team_friends = array();
//foreach ($friends_array as $value) {
    
    //echo $value;
    $url = "https://twitter.com/login?redirect_after_login=%2Fastros%2Ffollowers_you_follow";
    $html = file_get_html($url);
    //usleep(200000);
mysqli_close($con);
    echo $html;
    //$yup = $html->find('.yup');
    //if (count($yup) > 0)
        //array_push($team_friends, $friend_name);
//}



//echo json_encode($team_friends);
?>	