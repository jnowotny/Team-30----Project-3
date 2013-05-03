<?php

require("twitteroauth.php");
session_start();

if(!empty($_GET['oauth_verifier']) && !empty($_SESSION['oauth_token']) && !empty($_SESSION['oauth_token_secret'])){
$twitteroauth = new TwitterOAuth('tfnrxGhKHcjEixkUWydfNQ', 'DiIIdWtb22WthTD47skbWRin3uyLRVNNPBLIuoC9M', $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);

$access_token = $twitteroauth->getAccessToken($_GET['oauth_verifier']);

$_SESSION['access_token'] = $access_token;

$user_info = $twitteroauth->get('account/verify_credentials');
$_SESSION['user_info'] = $user_info;

$friends_ids = $twitteroauth->get('friends/ids', array('screen_name' => $user_info->screen_name));
$_SESSION['friends_ids'] = $friends_ids;

$search_tweets = $twitteroauth->get('search/tweets', array('q' => 'Yankees'));
$_SESSION['search_tweets'] = $search_tweets;

$timeline = $twitteroauth->get('statuses/home_timeline', array('count' => '40', 'include_entities' => 'true'));
$_SESSION['timeline'] = $timeline;


print_r($user_info->screen_name);
print " is now logged in!";

} else {
header('Location: twitter_login.php');
}



?>