<?php

require("twitteroauth.php");
session_start();

if(!empty($_GET['oauth_verifier']) && !empty($_SESSION['oauth_token']) && !empty($_SESSION['oauth_token_secret'])){
$twitteroauth = new TwitterOAuth('mBbU4Bo5Topp6VEwrLM8ow', 'YqJiwzcj4olqP14hjvzcz5CHqkmvvGurINd6UKbiwOs', $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
$_SESSION['twitteroauth'] = $twitteroauth;

$access_token = $twitteroauth->getAccessToken($_GET['oauth_verifier']);
$_SESSION['access_token'] = $access_token;

$user_info = $twitteroauth->get('account/verify_credentials');
$_SESSION['user_info'] = $user_info;

$con = mysqli_connect("mysql7.000webhost.com","a9710941_jnowot","sm0key","a9710941_db");
// Check connection
if (mysqli_connect_errno())
    echo "Failed to connect to MySQL: " . mysqli_connect_error();

$exists_query = "SELECT * FROM Users WHERE NAME = '$user_info->screen_name'";
$result = mysqli_query($con, $exists_query);
$found = FALSE;
while($row = mysqli_fetch_array($result)) {
    if ($row['NAME'] == $user_info->screen_name)
        $found = TRUE;
}

if (!$found) {
    $insert_query = "INSERT INTO Users VALUES ('$user_info->screen_name', 'nothing')";
    mysqli_query($con, $insert_query);
}

$friends_ids = $twitteroauth->get('friends/ids', array('screen_name' => $user_info->screen_name));
$_SESSION['friends_ids'] = $friends_ids;

//$search_tweets = $twitteroauth->get('search/tweets', array('q' => 'Yankees'));
//$_SESSION['search_tweets'] = $search_tweets;

$timeline = $twitteroauth->get('statuses/home_timeline', array('count' => '800', 'include_entities' => 'true'));
$_SESSION['timeline'] = $timeline;

print_r($user_info->screen_name);
print " is now logged in!";

} else {
header('Location: twitter_login.php');
}
?>