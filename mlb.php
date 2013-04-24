<?php
$day = date("d");
$month = date("m");
$year = date("Y");
$file = file_get_contents('http://gd2.mlb.com/components/game/mlb/year_'."".$year."".'/month_'."".$month."".'/day_'."".$day."".'/master_scoreboard.json');
echo $file; 
?>