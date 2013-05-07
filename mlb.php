<?php
//we assume central timezone....
date_default_timezone_set('America/Chicago');
$day = date("d");
$month = date("m");
$year = date("Y");
//get the mlb data for the day!
$file = file_get_contents('http://gd2.mlb.com/components/game/mlb/year_'."".$year."".'/month_'."".$month."".'/day_'."".$day."".'/master_scoreboard.json');
echo $file; //echo to use ion javascript
?>	