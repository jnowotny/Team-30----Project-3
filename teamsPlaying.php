<?php
$team_names = $_POST['teamnames'];
$user_name = $_POST['username'];
$teams_playing = array();
$con = mysqli_connect("mysql7.000webhost.com","a9710941_jnowot","sm0key","a9710941_db");
// Check connection
if (mysqli_connect_errno())
    echo "Failed to connect to MySQL: " . mysqli_connect_error();

$exists_query = "SELECT * FROM Users WHERE NAME = '$user_name'";
$result = mysqli_query($con, $exists_query);
$row = mysqli_fetch_array($result);

if ($row['XML'] != "nothing") {
    $string = $row['XML'];
    $existXML = new SimpleXMLElement($string);
    foreach ($existXML->children() as $team) {
        foreach ($team_names as $name) {
            if ($team == $name[0])
                array_push($teams_playing, $team);
            if ($team == $name[1])
                array_push($teams_playing, $team);
        }        
    }
}
mysqli_close($con);
$string = implode(", ", $teams_playing);
echo $string;
?>	