<?php
$team_names = $_POST['teamnames'];
$user_name = $_POST['username'];
$teams_playing = array(); //array of favorite teams who are playing today

$con = mysqli_connect("mysql7.000webhost.com","a9710941_jnowot","sm0key","a9710941_db"); //connect to mysql database
// Check connection
if (mysqli_connect_errno())
    echo "Failed to connect to MySQL: " . mysqli_connect_error();

$exists_query = "SELECT * FROM Users WHERE NAME = '$user_name'";
$result = mysqli_query($con, $exists_query);
$row = mysqli_fetch_array($result);

if ($row['XML'] != "nothing") { //if XML data exists
    $string = $row['XML'];
    $existXML = new SimpleXMLElement($string); //create an XML element from the XML field of the table
    foreach ($existXML->children() as $team) {
        foreach ($team_names as $name) {
            if ($team == $name[0]) //if the team is the away team
                array_push($teams_playing, $team); 
            if ($team == $name[1]) //if the team was the home team
                array_push($teams_playing, $team);
        }        
    }
}
mysqli_close($con);
$string = implode(", ", $teams_playing); //makes an array into a string ex. [Astros,Angels,Athletics] => "Astros, Angels, Athletics"
echo $string;
?>	