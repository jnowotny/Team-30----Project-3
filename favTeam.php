<?php
$user_name = $_POST['username'];
$team_name = $_POST['teamname'];

$con = mysqli_connect("mysql7.000webhost.com","a9710941_jnowot","sm0key","a9710941_db"); //connect to mysql database
// Check connection
if (mysqli_connect_errno())
    echo "Failed to connect to MySQL: " . mysqli_connect_error();

$exists_query = "SELECT * FROM Users WHERE NAME = '$user_name'";
$result = mysqli_query($con, $exists_query);
$row = mysqli_fetch_array($result);
if ($row['XML'] == "nothing") { //if there is no prior XML data, we want to create new XML data
    $favoriteXML = new SimpleXMLElement("<favorite_teams></favorite_teams>");
    $favoriteXML->addChild("team", $team_name);
    //Header('Content-type: text/html');
    $data = $favoriteXML->asXML();
    $update_query = "UPDATE Users SET XML = '$data' WHERE NAME = '$user_name'";
    print_r($update_query);
    mysqli_query($con, $update_query);
}
else { //XML data exists, we want to update it
    $string = $row['XML'];
    $existXML = new SimpleXMLElement($string);
    $team_exists = FALSE;
    foreach ($existXML->children() as $team) {
        if ($team == $team_name)
            $team_exists = TRUE;
    }
    if (!$team_exists) {
        $existXML->addChild("team", $team_name);
        Header('Content-type: text/html');
        $data = $existXML->asXML();
        $update_query = "UPDATE Users SET XML = '$data' WHERE NAME = '$user_name'";
        mysqli_query($con, $update_query);
    }
}

mysqli_close($con);
?>	