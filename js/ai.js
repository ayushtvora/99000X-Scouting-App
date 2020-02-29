let autonomous_winner = "";
let status = "";
let opponent_1 = "";
let opponent_2 = "";
let score_us = 0;
let score_them = 0;
let orange_us = 0;
let purple_us = 0;
let green_us = 0;
let orange_them = 0;
let purple_them = 0;
let green_them = 0;
let orange_tower = 0;
let purple_tower = 0;
let green_tower = 0;
let update_descore_orange_us = 0;
let update_descore_purple_us = 0;
let update_descore_green_us = 0;
let update_score_orange_us = 0;
let update_score_purple_us = 0;
let update_score_green_us = 0;
let update_descore_orange_them = 0;
let update_descore_purple_them = 0;
let update_descore_green_them = 0;
let update_score_orange_them = 0;
let update_score_purple_them = 0;
let update_score_green_them = 0;
let descore_orange_difference = 0;
let descore_purple_differenc = 0;
let descore_green_difference = 0;
let score_orange_difference = 0;
let score_purple_difference = 0;
let score_green_difference = 0;
let auton_bonus = 6;
let impossible = -1000;

function current_score_us (orange_us, purple_us, green_us, orange_tower, purple_tower, green_tower, autonomous_winner) {
  orange_tower += 1;
  purple_tower += 1;
  green_tower += 1;
  score_us = ((orange_us*orange_tower) + (purple_us*purple_tower) + (green_us*green_tower))

  if (autonomous_winner == "us") {
    score_us = score_us + auton_bonus;
  }

  return score_us;
}

function current_score_them (orange_them, purple_them, green_them, orange_tower, purple_tower, green_tower, autonomous_winner) {
  orange_tower += 1;
  purple_tower += 1;
  green_tower += 1;
  score_them = ((orange_them*orange_tower) + (purple_them*purple_tower) + (green_them*green_tower))

  if (autonomous_winner == "them") {
    score_them = score_them + auton_bonus;
  }

  return score_us;
}

function current_score_output (autonomous_winner, orange_us, purple_us, green_us, orange_tower, purple_tower, green_tower,) {
  orange_us = parseInt(prompt ("Please enter the number of orange cubes you have scored"));
  purple_us = parseInt(prompt ("Please enter the number of purple cubes you have scored"));
  green_us = parseInt(prompt ("Please enter the number of green cubes you have scored"));
  orange_them = parseInt(prompt ("Please enter the number of orange cubes they have scored"));
  purple_them = parseInt(prompt ("Please enter the number of purple cubes they have scored"));
  green_them = parseInt(prompt ("Please enter the number of green cubes they have scored"));
  orange_tower = parseInt(prompt ("Please enter the number of orange cubes in towers"));
  purple_tower = parseInt(prompt ("Please enter the number of purple cubes in towers"));
  green_tower = parseInt(prompt("Please enter the number of green cubes in towers"));
  autonomous_winner = prompt ("Who won autonomous_winner: us/them?");


  current_score_us(orange_us, purple_us, green_us, orange_tower, purple_tower, green_tower, autonomous_winner);

  current_score_them(orange_them, purple_them, green_them, orange_tower, purple_tower, green_tower, autonomous_winner);

  console.log("Your current score is = ", score_us);
  console.log("Their current score is = ", score_them);

  
  
}

current_score_output (autonomous_winner, orange_us, purple_us, green_us, orange_tower, purple_tower, green_tower);























