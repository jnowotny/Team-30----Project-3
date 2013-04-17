function getGames() {
    d = new Date();
    year = d.getFullYear();
    month = d.getMonth();
    month++;
    if (month < 10)
        month = "0" + month;
    day = d.getDate();
    if (day < 10)
        day = "0" + day;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://gd2.mlb.com/components/game/mlb/year_"+year+"/month_"+month+"/day_"+day+"/master_scoreboard.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    x=xmlDoc.getElementsByTagName("game");
    gamesToday = new Array();
    gamesID = new Array();
    matchup = new String();
    for (i = 0; i < x.length; i++) {
        matchup = x[i].getAttribute("home_team_name") + " vs. " + x[i].getAttribute("away_team_name");
        gamesToday.push(matchup);
        gamesID.push(x[i].getAttribute("id"));
    }
    var select = document.getElementById("selectGame");  
    for (i = 0; i < gamesToday.length; i++) {
        var Entry = document.createElement("option");
        Entry.text = gamesToday[i];
        select.add(Entry, null);
    }
    return gamesID;
}

function redirect(selection) {
    document.write(selection.selectedIndex);
}

function getScores(teamName) {
    d = new Date();
    year = d.getFullYear();
    month = d.getMonth();
    month++;
    if (month < 10)
        month = "0" + month;
    day = d.getDate();
    if (day < 10)
        day = "0" + day;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://gd2.mlb.com/components/game/mlb/year_"+year+"/month_"+month+"/day_"+day+"/scoreboard.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    x=xmlDoc.getElementsByTagName("team");
}