var gamesToday = new Array();
var teamNames = new Array();

function getGames() {
    while (gamesToday.length > 0)
        gamesToday.pop();
    d = new Date();
    year = d.getFullYear();
    month = d.getMonth();
    month++;
    if (month < 10)
        month = "0" + month;
    day = d.getDate();
    if (day < 10)
        day = "0" + day;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open("GET","http://gd2.mlb.com/components/game/mlb/year_"+year+"/month_"+month+"/day_"+day+"/master_scoreboard.xml",false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
    x = xmlDoc.getElementsByTagName("game");
    //gamesToday = new Array();
    matchup = new String();
    var select = document.getElementById("selectGame");
    while (select.length > 0)
        select.remove(0);
    var defaultOption = document.createElement("option");
    defaultOption.text = "--Select Game--";
    select.add(defaultOption, null);
    
    for (i = 0; i < x.length; i++) {
        //document.write("success!");
        names = new Array();
	names.push(x[i].getAttribute("home_team_name"));
	names.push(x[i].getAttribute("away_team_name"));
        teamNames.push(names);
        matchup = x[i].getAttribute("home_team_name") + " vs. " + x[i].getAttribute("away_team_name");
        //for drop-down menu
        var Entry = document.createElement("option");
        Entry.text = matchup;
        select.add(Entry, null);
        //for scoreboard
        scores = new Array();
        if (x[i].childNodes[3].nodeName == "linescore") {
            for (j = 1; j <= x[i].childNodes[3].childNodes.length; j+=2) {
                inning = new Array();
                inning.push(x[i].childNodes[3].childNodes[j].getAttribute("away"));
                inning.push(x[i].childNodes[3].childNodes[j].getAttribute("home"));
                scores.push(inning);
                if (j == x[i].childNodes[3].childNodes.length - 2)
                    break;
            }
        }
        gamesToday.push(scores);
    }
    //document.write(gamesToday[0][0][0]);
}

function showScores(selection) {
    var table = document.getElementById('table');
    while (table.rows.length > 0) 
        table.deleteRow(0);

    var row1 = table.insertRow(-1);
    for (i = 1; i <= 9; i++) {
        var cell = row1.insertCell(-1);
        cell.appendChild(document.createTextNode(i));
    }
    if (gamesToday[selection.selectedIndex - 1].length > 15) {
        for (i = 10; i < gamesToday[selection.selectedIndex - 1].length - 15; i++) {
            var cell = row1.insertCell(-1);
            cell.appendChild(document.createTextNode(i));
        }
    }
    var stats = ["R", "H", "E", "HR", "SB", "SO"];
    for (i = 0; i < stats.length; i++) {
        var cell = row1.insertCell(-1);
        cell.appendChild(document.createTextNode(stats[i]));
    }
    
    //AWAY SCORES
    var row2 = table.insertRow(-1); 
    if (gamesToday[selection.selectedIndex - 1].length >= 15) {
        for (i = 0; i < gamesToday[selection.selectedIndex - 1].length; i++) {
            var cell = row2.insertCell(-1);
            if (gamesToday[selection.selectedIndex - 1][i][0] != null)
                cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][0]));//code
            else cell.appendChild(document.createTextNode(" "));
        }
    }
    else {
        if (gamesToday[selection.selectedIndex - 1].length > 0) {
            for (i = 0; i < gamesToday[selection.selectedIndex - 1].length - 6; i++) {
                var cell = row2.insertCell(-1);
                if (gamesToday[selection.selectedIndex - 1][i][0] != null)
                    cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][0]));//code
                else cell.appendChild(document.createTextNode(" "));
            }
            for (i = 0; i < 15 - gamesToday[selection.selectedIndex - 1].length; i++) {
                var cell = row2.insertCell(-1);
                cell.appendChild(document.createTextNode(" "));
            }
            for (i = gamesToday[selection.selectedIndex - 1].length - 6; i < gamesToday[selection.selectedIndex - 1].length; i++) {
                var cell = row2.insertCell(-1);
                if (gamesToday[selection.selectedIndex - 1][i][0] != null)
                    cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][0]));//code
                else cell.appendChild(document.createTextNode(" "));
            }
        }
        else {
            for (i = 0; i < 15; i++) {
                var cell = row2.insertCell(-1);
                cell.appendChild(document.createTextNode(" ")); 
            }
        }
    }
    
    //HOME SCORES
    var row3 = table.insertRow(-1); 
    if (gamesToday[selection.selectedIndex - 1].length >= 15) {
        //document.write("hello");
        for (i = 0; i < gamesToday[selection.selectedIndex - 1].length; i++) {
            var cell = row3.insertCell(-1);
            if (gamesToday[selection.selectedIndex - 1][i][1] != null)
                cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][1]));//code
            else cell.appendChild(document.createTextNode(" "));
        }
    }
    else {
        if (gamesToday[selection.selectedIndex - 1].length > 0) {
            for (i = 0; i < gamesToday[selection.selectedIndex - 1].length - 6; i++) {
                var cell = row3.insertCell(-1);
                if (gamesToday[selection.selectedIndex - 1][i][1] != null)
                    cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][1]));//code
                else cell.appendChild(document.createTextNode(" "));
            }
            for (i = 0; i < 15 - gamesToday[selection.selectedIndex - 1].length; i++) {
                var cell = row3.insertCell(-1);
                cell.appendChild(document.createTextNode(" "));
            }
            for (i = gamesToday[selection.selectedIndex - 1].length - 6; i < gamesToday[selection.selectedIndex - 1].length; i++) {
                var cell = row3.insertCell(-1);
                if (gamesToday[selection.selectedIndex - 1][i][1] != null)
                    cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][1]));//code
                else cell.appendChild(document.createTextNode(" "));
            }
        }
        else {
            for (i = 0; i < 15; i++) {
                var cell = row3.insertCell(-1);
                cell.appendChild(document.createTextNode(" ")); 
            }
        }
    }
    document.body.appendChild(table);
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