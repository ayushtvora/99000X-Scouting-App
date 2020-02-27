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
        prediction7List = JSON.parse(localStorage.getItem("prediction7List"));

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
        comments = document.getElementById("comments").value;

    let focus;
    if (parseInt(orangeCount) > parseInt(greenCount) &&  parseInt(orangeCount) > parseInt(purpleCount)) {
        focus = "Orange"
    } else if (parseInt(greenCount) > parseInt(orangeCount) &&  parseInt(greenCount) > parseInt(purpleCount)) {
        focus = "Green"
    } else if (parseInt(purpleCount) > parseInt(orangeCount) && parseInt(purpleCount) > parseInt(greenCount)) {
        focus = "Purple"
    } else {
        focus = "None"
    }

    let prediction1, prediction2, prediction3, prediction4, prediction5, prediction6, prediction7;
    prediction1 = Prediction1(parseInt(maxStack), parseInt(stackTime), parseInt(towerTime));
    prediction2 = Prediction2(side, focus);
    prediction3 = Prediction3(parseInt(orangeCount), parseInt(greenCount), parseInt(purpleCount), focus);
    prediction4 = Prediction4(parseInt(auton));
    prediction5 = Prediction5(parseInt(maxStack), parseInt(stackTime), parseInt(towerTime), parseInt(score));
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

    localStorage.setItem("teamList", JSON.stringify(teamList));
    localStorage.setItem("matchList", JSON.stringify(matchList));
    localStorage.setItem("prediction1List", JSON.stringify(prediction1List));
    localStorage.setItem("prediction2List", JSON.stringify(prediction2List));
    localStorage.setItem("prediction3List", JSON.stringify(prediction3List));
    localStorage.setItem("prediction4List", JSON.stringify(prediction4List));
    localStorage.setItem("prediction5List", JSON.stringify(prediction5List));
    localStorage.setItem("prediction6List", JSON.stringify(prediction6List));
    localStorage.setItem("prediction7List", JSON.stringify(prediction7List));

    alert("Success! Go to the Strategies Page for the Results.")
}

/**
 * @return {string}
 */
function Prediction1(m, tStack, tTower) {
    let s, b, p;
    s = Math.min(3, Math.round((60+tTower)/(2*tStack)));
    b = Math.min(7, Math.floor((60-(s * tStack))/(tTower)));
    p = (s * m) * (b + 1);

    return "Predicted Score: ".concat(p.toString(), " Points with ", s.toString(), " stack(s) of ", m.toString(), " cubes and ", b.toString(), " tower(s).");
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
function Prediction4(autonPoints) {
    if (autonPoints === 0) {
        return "They do not have a functioning Auton.";
    } else {
        return "They have a ".concat(autonPoints.toString(), " point Auton.");
    }
}

/**
 * @return {string}
 */
function Prediction5(m, tStack, tTower, score) {
    let s, b, p, diff;
    s = Math.min(3, Math.round((60+tTower)/(2*tStack)));
    b = Math.min(7, Math.floor((60-(s * tStack))/(tTower)));
    p = (s * m) * (b + 1);

    if (score > p) {
        diff = score - p;
        return "In the last match, the team surpassed their expected score by ".concat(diff.toString(), " points.");
    } else if (score < p) {
        diff = p - score;
        return "In the last match, the team failed their expected score by ".concat(diff.toString(), " points.");
    } else {
        return "In the last match, the team met their expected goal of ".concat(score.toString(), ".");
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
        strategyView = "";

    for (let i = 0; i < teamList.length; i++) {
        strategyView += "<h3>" + teamList[i] + " (Q" + matchList[i] + ")</h3>" +
            "<ul><li>" + prediction1List[i] +
            "</li><li>"+ prediction2List[i] +
            "</li><li>"+ prediction3List[i] +
            "</li><li>"+ prediction4List[i] +
            "</li><li>"+ prediction5List[i] +
            "</li><li>"+ prediction6List[i] +
            "</li><li>"+ prediction7List[i] + "</li></ul>";
    }

    document.getElementById("strategyView").innerHTML = strategyView;
}

function GoUp(id) {
    let value = parseInt(document.getElementById(id).value);

    if (id === "greenCount" || id === "purpleCount" || id === "orangeCount") {
        if (value != 22) {
            document.getElementById(id).value = value + 1;
        }
    } else {
        if (value != 7) {
            document.getElementById(id).value = value + 1;
        }
    }
}

function GoDown(id) {
    let value = parseInt(document.getElementById(id).value);
    if (value != 0) {
        document.getElementById(id).value = value - 1;
    }
}