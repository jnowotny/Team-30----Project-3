<?php

require("twitteroauth.php");
session_start();

if(!empty($_GET['oauth_verifier']) && !empty($_SESSION['oauth_token']) && !empty($_SESSION['oauth_token_secret'])){
$twitteroauth = new TwitterOAuth('tfnrxGhKHcjEixkUWydfNQ', 'DiIIdWtb22WthTD47skbWRin3uyLRVNNPBLIuoC9M', $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);

$access_token = $twitteroauth->getAccessToken($_GET['oauth_verifier']);

$_SESSION['access_token'] = $access_token;

$user_info = $twitteroauth->get('account/verify_credentials');

print_r($user_info->screen_name);
print " is now logged in!";
} else {
header('Location: twitter_login.php');
}



?>