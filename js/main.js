function calculate() {

    if (localStorage.getItem("matchList") === null) {
        setArrays()
    }

    let matchList = JSON.parse(localStorage.getItem("matchList")),
        teamList = JSON.parse(localStorage.getItem("teamList")),
        sideList = JSON.parse(localStorage.getItem("sideList")),
        autonPointsList = JSON.parse(localStorage.getItem("autonPointsList")),
        maxStackList = JSON.parse(localStorage.getItem("maxStackList")),
        stackTimeList = JSON.parse(localStorage.getItem("stackTimeList")),
        greenCountList = JSON.parse(localStorage.getItem("greenCountList")),
        orangeCountList = JSON.parse(localStorage.getItem("orangeCountList")),
        purpleCountList = JSON.parse(localStorage.getItem("purpleCountList")),
        towerTimeList = JSON.parse(localStorage.getItem("towerTimeList")),
        scoreList = JSON.parse(localStorage.getItem("scoreList")),
        commentsList = JSON.parse(localStorage.getItem("commentsList"));
        //TODO: ADD PREDICTIONS

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

    let prediction1, prediction2, prediction3, prediction4, prediction5, prediction6;
    prediction1 = Prediction1(parseInt(maxStack), parseInt(stackTime), parseInt(towerTime));
    prediction2 = Prediction2(side, focus);
    prediction3 = Prediction3(parseInt(orangeCount), parseInt(greenCount), parseInt(purpleCount), focus);
    prediction4 = Prediction4(parseInt(auton));
    prediction5 = Prediction5(parseInt(maxStack), parseInt(stackTime), parseInt(towerTime), parseInt(score));
    prediction6 = Prediction6(comments);


    matchList.push(match);
    teamList.push(team);
    sideList.push(side);
    autonPointsList.push(auton);
    maxStackList.push(maxStack);
    stackTimeList.push(stackTime);
    greenCountList.push(greenCount);
    orangeCountList.push(orangeCount);
    purpleCountList.push(purpleCount);
    towerTimeList.push(towerTime);
    scoreList.push(score);
    commentsList.push(comments);

    localStorage.setItem("matchList", JSON.stringify(matchList));
    localStorage.setItem("teamList", JSON.stringify(teamList));
    localStorage.setItem("sideList", JSON.stringify(sideList));
    localStorage.setItem("autonPointsList", JSON.stringify(autonPointsList));
    localStorage.setItem("maxStackList", JSON.stringify(maxStackList));
    localStorage.setItem("stackTimeList", JSON.stringify(stackTimeList));
    localStorage.setItem("greenCountList", JSON.stringify(greenCountList));
    localStorage.setItem("orangeCountList", JSON.stringify(orangeCountList));
    localStorage.setItem("purpleCountList", JSON.stringify(purpleCountList));
    localStorage.setItem("towerTimeList", JSON.stringify(towerTimeList));
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    localStorage.setItem("commentsList", JSON.stringify(commentsList));

    alert(prediction1);
    alert(prediction2);
    alert(prediction3);
    alert(prediction4);
    alert(prediction5);
    alert(prediction6);
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
function Prediction6(comments) {
    if (comments === "") {
        return "There are no additional comments.";
    } else {
        return "Additional Comments: ".concat(comments);
    }
}

function setArrays() {
    localStorage.setItem("matchList", "[]");
    localStorage.setItem("teamList", "[]");
    localStorage.setItem("sideList", "[]");
    localStorage.setItem("autonPointsList", "[]");
    localStorage.setItem("maxStackList", "[]");
    localStorage.setItem("stackTimeList", "[]");
    localStorage.setItem("greenCountList", "[]");
    localStorage.setItem("orangeCountList", "[]");
    localStorage.setItem("purpleCountList", "[]");
    localStorage.setItem("towerTimeList", "[]");
    localStorage.setItem("scoreList", "[]");
    localStorage.setItem("commentsList", "[]");
}