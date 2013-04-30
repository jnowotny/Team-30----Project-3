<?php

//CREATE TABLE `users` (
//`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
//`oauth_provider` varchar(10),
//`oauth_uid` text,
//`oauth_token` text,
//`oauth_secret` text,
//`username` text,
//PRIMARY KEY (`id`)
//) ENGINE=MyISAM DEFAULT CHARSET=latin1;


//note: this must be stored as XML or JSON
$sql="CREATE TABLE users(
id int(10) unsigned NOT NULL AUTO_INCREMENT,
oauth_provider varchar(10),
oauth_uid text,
oauth_token text,
oauth_secret text,
username text,
PRIMARY KEY(id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1";

require("twitteroauth.php");
session_start();

$twitteroauth = new TwitterOAuth('tfnrxGhKHcjEixkUWydfNQ', 'DiIIdWtb22WthTD47skbWRin3uyLRVNNPBLIuoC9M');

//$request_token = $twitteroauth->getRequestToken('http://trashtalk.host56.com/twitter_oauth.php');
$request_token = $twitteroauth->getRequestToken('http://trashtalk.host56.com/logged.html');

$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

if($twitteroauth->http_code==200){
	$url = $twitteroauth->getAuthorizeURL($request_token['oauth_token']);
	header('Location: '. $url);
} else {
print_r($twitteroauth->http_code);	
die('something went wrong');
}

?>