<?php

require("twitteroauth.php");
session_start();
//this is how you login to twitter through their API
if(!empty($_GET['oauth_verifier']) && !empty($_SESSION['oauth_token']) && !empty($_SESSION['oauth_token_secret'])){
$twitteroauth = new TwitterOAuth('mBbU4Bo5Topp6VEwrLM8ow', 'YqJiwzcj4olqP14hjvzcz5CHqkmvvGurINd6UKbiwOs', $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
$_SESSION['twitteroauth'] = $twitteroauth;

//get the access token and allow it to be used by other php scripts
$access_token = $twitteroauth->getAccessToken($_GET['oauth_verifier']);
$_SESSION['access_token'] = $access_token;

//get the user info and allow it to be used by other php scripts
$user_info = $twitteroauth->get('account/verify_credentials');
$_SESSION['user_info'] = $user_info;

$con = mysqli_connect("mysql7.000webhost.com","a9710941_jnowot","sm0key","a9710941_db"); //connect to mysql database
// Check connection
if (mysqli_connect_errno())
    echo "Failed to connect to MySQL: " . mysqli_connect_error();

//does the user that is logged in exist in our Users table?
$exists_query = "SELECT * FROM Users WHERE NAME = '$user_info->screen_name'";
$result = mysqli_query($con, $exists_query);
$found = FALSE; //does user exist
while($row = mysqli_fetch_array($result)) {
    if ($row['NAME'] == $user_info->screen_name)
        $found = TRUE; // user exists!
}

if (!$found) { //if user does not exist, let's add him/her to the table!
    $insert_query = "INSERT INTO Users VALUES ('$user_info->screen_name', 'nothing')";
    mysqli_query($con, $insert_query);
}

//put on logged.html who is logged in
print_r($user_info->screen_name);
print " is now logged in!";

} else {
header('Location: twitter_login.php');
}
?>