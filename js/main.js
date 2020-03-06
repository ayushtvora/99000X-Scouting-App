function calculate() {

    if (localStorage.getItem("matchList") === null) {
        setArrays()
    }

    let teamList = JSON.parse(localStorage.getItem("teamList")),
        matchList = JSON.parse(localStorage.getItem("matchList")),
        prediction1List = JSON.parse(localStorage.getItem("prediction1List")),
        prediction2List = JSON.parse(localStorage.getItem("prediction2List")),
        prediction3List = JSON.parse(localStorage.getItem("prediction3List")),
        prediction4List = JSON.parse(localStorage.getItem("prediction4List")),
        prediction5List = JSON.parse(localStorage.getItem("prediction5List")),
        prediction6List = JSON.parse(localStorage.getItem("prediction6List")),
        prediction7List = JSON.parse(localStorage.getItem("prediction7List")),
        scouterList = JSON.parse(localStorage.getItem("scouterList"));

    let match = document.getElementById("match").value,
        team = document.getElementById("team").value,
        side = document.getElementById("side").value,
        auton = document.getElementById("auton").value,
        maxStack = document.getElementById("maxStack").value,
        stackTime = document.getElementById("stackTime").value,
        greenCount = document.getElementById("greenCount").value,
        orangeCount = document.getElementById("orangeCount").value,
        purpleCount = document.getElementById("purpleCount").value,
        towerTime = document.getElementById("towerTime").value,
        greenTowerCount = document.getElementById("greenTowerCount").value,
        orangeTowerCount = document.getElementById("orangeTowerCount").value,
        purpleTowerCount = document.getElementById("purpleTowerCount").value,
        score = document.getElementById("score").value,
        comments = document.getElementById("comments").value,
        scouterName = document.getElementById("scouterName").value,
        autonComments = document.getElementById("autonComments").value,
        type = document.getElementById("type").value,
        driverSkill = document.getElementById("driverSkill").value;


    if (match === "") {
        alert("Please Insert the Match Number");
        return;
    } else if (team === "") {
        alert("Please Insert the Team Name");
        return;
    }

    let focus;
    if (parseInt(orangeCount) > parseInt(greenCount) &&  parseInt(orangeCount) > parseInt(purpleCount)) {
        focus = "Orange";
    } else if (parseInt(greenCount) > parseInt(orangeCount) &&  parseInt(greenCount) > parseInt(purpleCount)) {
        focus = "Green";
    } else if (parseInt(purpleCount) > parseInt(orangeCount) && parseInt(purpleCount) > parseInt(greenCount)) {
        focus = "Purple";
    } else {
        focus = "None";
    }

    let prediction1, prediction2, prediction3, prediction4, prediction5, prediction6, prediction7;
    prediction1 = Prediction1(parseInt(maxStack), parseInt(stackTime), parseInt(towerTime), type);
    prediction2 = Prediction2(side, focus);
    prediction3 = Prediction3(parseInt(orangeCount), parseInt(greenCount), parseInt(purpleCount), focus);
    prediction4 = Prediction4(parseInt(auton), autonComments);
    prediction5 = Prediction5(parseInt(maxStack), parseInt(stackTime), parseInt(towerTime), parseInt(score), driverSkill);
    prediction6 = Prediction6(parseInt(orangeTowerCount), parseInt(greenTowerCount), parseInt(purpleTowerCount));
    prediction7 = Prediction7(comments);


    teamList.push(team);
    matchList.push(match);
    prediction1List.push(prediction1);
    prediction2List.push(prediction2);
    prediction3List.push(prediction3);
    prediction4List.push(prediction4);
    prediction5List.push(prediction5);
    prediction6List.push(prediction6);
    prediction7List.push(prediction7);
    scouterList.push("Scouted by: ".concat(scouterName));


    localStorage.setItem("teamList", JSON.stringify(teamList));
    localStorage.setItem("matchList", JSON.stringify(matchList));
    localStorage.setItem("prediction1List", JSON.stringify(prediction1List));
    localStorage.setItem("prediction2List", JSON.stringify(prediction2List));
    localStorage.setItem("prediction3List", JSON.stringify(prediction3List));
    localStorage.setItem("prediction4List", JSON.stringify(prediction4List));
    localStorage.setItem("prediction5List", JSON.stringify(prediction5List));
    localStorage.setItem("prediction6List", JSON.stringify(prediction6List));
    localStorage.setItem("prediction7List", JSON.stringify(prediction7List));
    localStorage.setItem("scouterList", JSON.stringify(scouterList));

    alert("Success! Go to the Strategies Page for the Results.")
}

/**
 * @return {string}
 */
function Prediction1(m, tStack, tTower, type) {
    let s, b, p;
    s = Math.min(3, Math.round((60+tTower)/(2*tStack)));
    alert(s);
    b = Math.min(7, Math.floor((60-(s * tStack))/(tTower)));
    alert(b);
    p = (s * m) * (b + 1);
    alert(p);

    let prediction =  "Predicted Score: ".concat(p.toString(), " Points with ", s.toString(), " stack(s) of ", m.toString(), " cubes and ", b.toString(), " tower(s). Robot Type: ", type);
    return prediction;
}

/**
 * @return {string}
 */
function Prediction2(side, colour) {
    if ((side === "Red" && colour === "Green") || (side === "Blue" && colour === "Orange")){
        return "They are going for the Basic Colour Strategy; If they are on the Red Alliance, they will be going for green cubes. If they are on the Blue Alliance, they will be going for the orange cubes."
    } else if ((side === "Red" && colour === "Orange") || (side === "Blue" && colour === "Green")){
        return "They are going for the Opposite Colour Strategy; If they are on the Red Alliance, they will be going for orange cubes. If they are on the Blue Alliance, they will be going for the green cubes."
    } else if (colour === "Purple"){
        return "They are going for the Purple Cubes, regardless of Alliance Colour."
    } else {
        return "They do not have a preference on what Cubes to take."
    }
}

/**
 * @return {string}
 */
function Prediction3(o, g, p, focus) {
    let total = o + g + p, percent, prediction;

    if (focus === "Orange") {
        percent = Math.round(o / total * 100);
        prediction = "The team collected ".concat(total.toString(), " cubes, with most of the cubes (", percent, "%) being their focus colour (Orange).")
    } else if (focus === "Green") {
        percent = Math.round(g / total * 100);
        prediction = "The team collected ".concat(total.toString(), " cubes, with most of the cubes (", percent, "%) being their focus colour (Green).")
    } else if (focus === "Purple") {
        percent = Math.round(p / total * 100);
        prediction = "The team collected ".concat(total.toString(), " cubes, with most of the cubes (", percent, "%) being their focus colour (Purple).")
    } else {
        prediction = "The team collected ".concat(total.toString(), " cubes, with a mix of all the colours.")
    }

    return prediction;
}

/**
 * @return {string}
 */
function Prediction4(autonPoints, autonComments) {
    if (autonPoints === 0) {
        return "They do not have a functioning Auton.";
    } else {
        return "They have a ".concat(autonPoints.toString(), " point Auton. Some additional comments: ", autonComments);
    }
}

/**
 * @return {string}
 */
function Prediction5(m, tStack, tTower, score, driverSkill) {
    let s, b, p, diff;
    s = Math.min(3, Math.round((60+tTower)/(2*tStack)));
    b = Math.min(7, Math.floor((60-(s * tStack))/(tTower)));
    p = (s * m) * (b + 1);

    if (score > p) {
        diff = score - p;
        return "In the last match, the team surpassed their expected score by ".concat(diff.toString(), " points. The driver was rated ", driverSkill, "/10.");
    } else if (score < p) {
        diff = p - score;
        return "In the last match, the team failed their expected score by ".concat(diff.toString(), " points. The driver was rated ", driverSkill, "/10.");
    } else {
        return "In the last match, the team met their expected goal of ".concat(score.toString(), ". The driver was rated ", driverSkill, "/10.");
    }
}

/**
 * @return {string}
 */
function Prediction6(o, g, p) {
    let total = o + g + p;
    return "During the match, the team had ".concat(total.toString(), " towers. From them, ", o.toString(), " were orange, ", g.toString(), " were green, and ", p.toString(), " were purple. ")
}

/**
 * @return {string}
 */
function Prediction7(comments) {
    if (comments === "") {
        return "There are no additional comments.";
    } else {
        return "Additional Comments: ".concat(comments);
    }
}

function setArrays() {
    localStorage.setItem("teamList", "[]");
    localStorage.setItem("matchList", "[]");
    localStorage.setItem("prediction1List", "[]");
    localStorage.setItem("prediction2List", "[]");
    localStorage.setItem("prediction3List", "[]");
    localStorage.setItem("prediction4List", "[]");
    localStorage.setItem("prediction5List", "[]");
    localStorage.setItem("prediction6List", "[]");
    localStorage.setItem("prediction7List", "[]");
    localStorage.setItem("scouterList", "[]");
}

function strategies() {
    let teamList = JSON.parse(localStorage.getItem("teamList")),
        matchList = JSON.parse(localStorage.getItem("matchList")),
        prediction1List = JSON.parse(localStorage.getItem("prediction1List")),
        prediction2List = JSON.parse(localStorage.getItem("prediction2List")),
        prediction3List = JSON.parse(localStorage.getItem("prediction3List")),
        prediction4List = JSON.parse(localStorage.getItem("prediction4List")),
        prediction5List = JSON.parse(localStorage.getItem("prediction5List")),
        prediction6List = JSON.parse(localStorage.getItem("prediction6List")),
        prediction7List = JSON.parse(localStorage.getItem("prediction7List")),
        scouterList = JSON.parse(localStorage.getItem("scouterList")),
        strategyView = "";

    for (let i = 0; i < teamList.length; i++) {
        strategyView += "<h3>" + teamList[i] + " (Q" + matchList[i] + ")</h3>" +
            "<ul><li>" + prediction1List[i] +
            "</li><li>"+ prediction2List[i] +
            "</li><li>"+ prediction3List[i] +
            "</li><li>"+ prediction4List[i] +
            "</li><li>"+ prediction5List[i] +
            "</li><li>"+ prediction6List[i] +
            "</li><li>"+ prediction7List[i] +
            "</li><li>"+ scouterList[i] + "</li></ul>";
    }

    document.getElementById("strategyView").innerHTML = strategyView;
}

function GoUp(id, greenTowerCount, purpleTowerCount, orangeTowerCount) {
    let val = parseInt(document.getElementById(id).value),
    totalTowers;

    if (id === "greenTowerCount" || id === "purpleTowerCount" || id === "orangeTowerCount") {
        totalTowers = parseInt(document.getElementById("greenTowerCount").value) + parseInt(document.getElementById("purpleTowerCount").value) + parseInt(document.getElementById("orangeTowerCount").value);
    } else if (id === "greenTowers" || id === "purpleTowers" || id === "orangeTowers") {
        totalTowers = parseInt(document.getElementById("greenTowers").value) + parseInt(document.getElementById("purpleTowers").value) + parseInt(document.getElementById("orangeTowers").value);
    }
    if (totalTowers != 7) {
        document.getElementById(id).value = val + 1;
    } else {
        if (val != 22) {
            document.getElementById(id).value = val + 1;
        }
    }
}

function GoDown(id) {
    let value = parseInt(document.getElementById(id).value);
    if (value != 0) {
        document.getElementById(id).value = value - 1;
    }
}

function clearStrategies() {
    localStorage.setItem("teamList", "[]");
    localStorage.setItem("matchList", "[]");
    localStorage.setItem("prediction1List", "[]");
    localStorage.setItem("prediction2List", "[]");
    localStorage.setItem("prediction3List", "[]");
    localStorage.setItem("prediction4List", "[]");
    localStorage.setItem("prediction5List", "[]");
    localStorage.setItem("prediction6List", "[]");
    localStorage.setItem("prediction7List", "[]");
    document.getElementById("strategyView").innerHTML = "<p>Start scouting teams to see strategies for your different teams!</p>";
}

let team = "red";
function switchSides() {
    if (team === "red") {
        team = "blue";
        document.getElementById("scoreUs").style.color = "#0775C8";
        document.getElementById("scoreThem").style.color = "#D6252F";
        document.getElementById("switcher").style.color = "#0775C8";
        document.getElementById("usCubes").style.backgroundColor = "#0775C8";
        document.getElementById("themCubes").style.backgroundColor = "#D6252F";

    } else if (team === "blue") {
        team = "red";
        document.getElementById("scoreUs").style.color = "#D6252F";
        document.getElementById("scoreThem").style.color = "#0775C8";
        document.getElementById("switcher").style.color = "#D6252F";
        document.getElementById("usCubes").style.backgroundColor = "#D6252F";
        document.getElementById("themCubes").style.backgroundColor = "#0775C8";
    }
} 

let robot = "white";
function greyToWhite() {
    if (robot === "white") {
        robot = "grey";
        document.getElementById("robot").style.color = "grey";
    } else if (robot === "grey") {
        robot = "white";
        document.getElementById("robot").style.color = "white";
    }
}

// function updateScore() {
//     let green_us = parseInt(document.getElementById("usGreenCount").value),
//         purple_us = parseInt(document.getElementById("usPurpleCount").value),
//         orange_us = parseInt(document.getElementById("usOrangeCount").value),
//         green_them = parseInt(document.getElementById("themGreenCount").value),
//         purple_them = parseInt(document.getElementById("themPurpleCount").value),
//         orange_count = parseInt(document.getElementById("themOrangeCount").value),
//         green_tower = parseInt(document.getElementById("greenTowers").value),
//         purple_tower = parseInt(document.getElementById("purpleTowers").value),
//         orange_tower = parseInt(document.getElementById("orangeTowers").value),
//         autonomous_winner = document.getElementById("autonWinner").value,
//         opponent_1 = document.getElementById("opponent1").value,
//         opponent_2= document.getElementById("opponent2").value,
//         usScore = 0, themScore = 0, greenMultiplier = 1, purpleMultiplier = 1, orangeMultiplier = 1;

//     if (autonWinner === "us") {
//          usScore += auton_bonus;
//     } else if (autonWinner === "them") {
//         themScore += auton_bonus;
//     }

//     greenMultiplier += greenTowers;
//     purpleMultiplier += purpleTowers;
//     orangeMultiplier += orangeTowers;

//     usScore += (usGreenCount * greenMultiplier) + (usPurpleCount * purpleMultiplier) + (usOrangeCount * orangeMultiplier);
//     themScore += (themGreenCount * greenMultiplier) + (themPurpleCount * purpleMultiplier) + (themOrangeCount * orangeMultiplier);
    
//     document.getElementById("scoreUs").innerHTML = usScore.toString();
//     document.getElementById("scoreThem").innerHTML = themScore.toString();


// }
