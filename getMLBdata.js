var gamesToday = new Array();
var teamNames = new Array();

function getGames2() {
    gamesToday = [];
    teamNames = [];
    $.getJSON("mlb.php", function(JSON) {
        matchup = new String();
        var select = document.getElementById("selectGame");
        while (select.length > 1)
            select.remove(1);
        $.each(JSON.data.games.game, function(i, game) {
            names = new Array();
            names.push(game.away_team_name);
            names.push(game.home_team_name);
            teamNames.push(names);
            //for drop-down menu
            matchup = game.away_team_name + " vs. " + game.home_team_name;
            var Entry = document.createElement("option");
            Entry.text = matchup;
            select.add(Entry, null);
            //for scoreboard
            scores = new Array();
            if (game.status.status != "Preview") {
                $.each(game.linescore.inning, function(j, inning) {
                    inningArray = new Array();
                    inningArray.push(inning.away);
                    inningArray.push(inning.home);
                    scores.push(inningArray);
                })
                runs = new Array();
                runs.push(game.linescore.r.away);
                runs.push(game.linescore.r.home);
                scores.push(runs);
                
                hits = new Array();
                hits.push(game.linescore.h.away);
                hits.push(game.linescore.h.home);
                scores.push(hits);
                
                errors = new Array();
                errors.push(game.linescore.e.away);
                errors.push(game.linescore.e.home);
                scores.push(errors);

                homeruns = new Array();
                homeruns.push(game.linescore.hr.away);
                homeruns.push(game.linescore.hr.home);
                scores.push(homeruns);
                
                bases = new Array();
                bases.push(game.linescore.sb.away);
                bases.push(game.linescore.sb.home);
                scores.push(bases);
               
                strikes = new Array();
                strikes.push(game.linescore.so.away);
                strikes.push(game.linescore.so.home);   
                scores.push(strikes);
            }
            gamesToday.push(scores);
        })
    })
}

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
    while (table.rows.length >0) 
        table.deleteRow(0);
    
    var row1 = table.insertRow(-1);
    var emptyCell = row1.insertCell(-1);
    emptyCell.appendChild(document.createTextNode(" "));
    for (i = 1; i <= 9; i++) {
        var cell = row1.insertCell(-1);
        cell.appendChild(document.createTextNode(i));
    }
    if (gamesToday[selection.selectedIndex - 1].length > 15) {
        for (i = 10; i <= gamesToday[selection.selectedIndex - 1].length - 6; i++) {
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
    var awayCell = row2.insertCell(-1);
    awayCell.appendChild(document.createTextNode(teamNames[selection.selectedIndex - 1][0]));
    if (gamesToday[selection.selectedIndex - 1].length >= 15) {
        for (i = 0; i < gamesToday[selection.selectedIndex - 1].length; i++) {
            var cell = row2.insertCell(-1);
            if (gamesToday[selection.selectedIndex - 1][i][0] != null) {
                if (gamesToday[selection.selectedIndex - 1][i][0] != "")
                    cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][0]));
                else
                    cell.appendChild(document.createTextNode("0"));
            }
            else 
                cell.appendChild(document.createTextNode(" "));
        }
    }
    else {
        if (gamesToday[selection.selectedIndex - 1].length > 0) {
            for (i = 0; i < gamesToday[selection.selectedIndex - 1].length - 6; i++) {
                var cell = row2.insertCell(-1);
                if (gamesToday[selection.selectedIndex - 1][i][0] != null) {
                    if (gamesToday[selection.selectedIndex - 1][i][0] != "")
                        cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][0]));
                    else
                        cell.appendChild(document.createTextNode("0")); 
                }
                else 
                    cell.appendChild(document.createTextNode(" "));
            }
            for (i = 0; i < 15 - gamesToday[selection.selectedIndex - 1].length; i++) {
                var cell = row2.insertCell(-1);
                cell.appendChild(document.createTextNode(" "));
            }
            for (i = gamesToday[selection.selectedIndex - 1].length - 6; i < gamesToday[selection.selectedIndex - 1].length; i++) {
                var cell = row2.insertCell(-1);
                if (gamesToday[selection.selectedIndex - 1][i][0] != null) {
                    if (gamesToday[selection.selectedIndex - 1][i][0] != "")
                        cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][0]));
                    else
                        cell.appendChild(document.createTextNode("0"));
                }
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
    var homeCell = row3.insertCell(-1);
    homeCell.appendChild(document.createTextNode(teamNames[selection.selectedIndex - 1][1]));
    if (gamesToday[selection.selectedIndex - 1].length >= 15) {
        //document.write("hello");
        for (i = 0; i < gamesToday[selection.selectedIndex - 1].length; i++) {
            var cell = row3.insertCell(-1);
            if (gamesToday[selection.selectedIndex - 1][i][1] != null) {
                if (gamesToday[selection.selectedIndex - 1][i][1] != "")
                    cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][1]));
                else
                    cell.appendChild(document.createTextNode("0")); 
            }
            else 
                cell.appendChild(document.createTextNode(" "));
        }
    }
    else {
        if (gamesToday[selection.selectedIndex - 1].length > 0) {
            for (i = 0; i < gamesToday[selection.selectedIndex - 1].length - 6; i++) {
                var cell = row3.insertCell(-1);
                if (gamesToday[selection.selectedIndex - 1][i][1] != null) {
                    if (gamesToday[selection.selectedIndex - 1][i][1] != "")
                        cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][1]));
                    else
                        cell.appendChild(document.createTextNode("0")); 
                }
                else 
                    cell.appendChild(document.createTextNode(" "));
            }
            for (i = 0; i < 15 - gamesToday[selection.selectedIndex - 1].length; i++) {
                var cell = row3.insertCell(-1);
                cell.appendChild(document.createTextNode(" "));
            }
            for (i = gamesToday[selection.selectedIndex - 1].length - 6; i < gamesToday[selection.selectedIndex - 1].length; i++) {
                var cell = row3.insertCell(-1);
                if (gamesToday[selection.selectedIndex - 1][i][1] != null) {
                    if (gamesToday[selection.selectedIndex - 1][i][1] != "")
                        cell.appendChild(document.createTextNode(gamesToday[selection.selectedIndex - 1][i][1]));
                    else
                        cell.appendChild(document.createTextNode("0")); 
                }
                else 
                    cell.appendChild(document.createTextNode(" "));
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

function updateScores() {
    while (gamesToday.length > 0) 
        gamesToday.remove(0);
    $.getJSON("mlb.php", function(JSON) {
        $.each(JSON.data.games.game, function(i, game) {
            //for scoreboard
            scores = new Array();
            if (game.status.status != "Preview") {
                $.each(game.linescore.inning, function(j, inning) {
                    inningArray = new Array();
                    inningArray.push(inning.away);
                    inningArray.push(inning.home);
                    scores.push(inningArray);
                })
                runs = new Array();
                runs.push(game.linescore.r.away);
                runs.push(game.linescore.r.home);
                scores.push(runs);
                
                hits = new Array();
                hits.push(game.linescore.h.away);
                hits.push(game.linescore.h.home);
                scores.push(hits);
                
                errors = new Array();
                errors.push(game.linescore.e.away);
                errors.push(game.linescore.e.home);
                scores.push(errors);

                homeruns = new Array();
                homeruns.push(game.linescore.hr.away);
                homeruns.push(game.linescore.hr.home);
                scores.push(homeruns);
                
                bases = new Array();
                bases.push(game.linescore.sb.away);
                bases.push(game.linescore.sb.home);
                scores.push(bases);
               
                strikes = new Array();
                strikes.push(game.linescore.so.away);
                strikes.push(game.linescore.so.home);   
                scores.push(strikes);
            }
            gamesToday.push(scores);
        })
    })
}