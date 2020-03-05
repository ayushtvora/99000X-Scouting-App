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
let descore_purple_difference = 0;
let descore_green_difference = 0;
let score_orange_difference = 0;
let score_purple_difference = 0;
let score_green_difference = 0;
let auton_bonus = 6;
let impossible = -1000;
let strategiesArray = [];

function current_score_us (orange_us, purple_us, green_us, orange_tower, purple_tower, green_tower, autonomous_winner) {
  orange_tower += 1;
  purple_tower += 1;
  green_tower += 1;
  score_us = ((orange_us*orange_tower) + (purple_us*purple_tower) + (green_us*green_tower))

  if (autonomous_winner == "us") {
    score_us = score_us + auton_bonus;
  }

  if (autonomous_winner == "tie") {
    score_us = score_us +3;
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

  if (autonomous_winner == "tie") {
    score_them = score_them +3;
  }

  return score_us;
}

function current_score_output () {
  orange_us = parseInt(document.getElementById("usOrangeCount").value);
  purple_us = parseInt(document.getElementById("usPurpleCount").value);
  green_us = parseInt(document.getElementById("usGreenCount").value);
  orange_them = parseInt(document.getElementById("themOrangeCount").value);
  purple_them = parseInt(document.getElementById("themPurpleCount").value);
  green_them = parseInt(document.getElementById("themGreenCount").value);
  orange_tower = parseInt(document.getElementById("orangeTowers").value);
  purple_tower = parseInt(document.getElementById("purpleTowers").value);
  green_tower = parseInt(document.getElementById("greenTowers").value);
  autonomous_winner = document.getElementById("autonWinner").value;


  current_score_us(orange_us, purple_us, green_us, orange_tower, purple_tower, green_tower, autonomous_winner);

  current_score_them(orange_them, purple_them, green_them, orange_tower, purple_tower, green_tower, autonomous_winner);

  document.getElementById("scoreUs").innerHTML = score_us.toString();
  document.getElementById("scoreThem").innerHTML = score_them.toString();

}

function descore_orange (score_us, score_them, orange_us, orange_them, orange_tower, status) {

  if (orange_tower == 0) {
    strategiesArray.push("You cannot descore an orange cube")
  }
    else if (orange_tower > 0) {
      update_descore_orange_us = score_us - orange_us;
      update_descore_orange_them = score_them - orange_them;
      descore_orange_difference = update_descore_orange_us - update_descore_orange_them;

        if (update_descore_orange_us > update_descore_orange_them) {
          status = "WIN";
        }
        
        else if (update_descore_orange_us < update_descore_orange_them) {
          status = "LOSE "
        }

        else {
          status = "TIE"
        }

        strategiesArray.push("The updated score (Us/Them) if you descore an orange cube will be = ".concat(update_descore_orange_us, "/", update_descore_orange_them, " || ", status));
        return descore_green_difference;

    }

}

function descore_green (score_us, score_them, green_us, green_them, green_tower, status) {
  if (green_tower == 0) {
    strategiesArray.push("You cannot descore a green.");

  }

  else if (green_tower > 0) {
    update_descore_green_us = score_us - green_us;
    update_descore_green_them = score_them - green_them;
    descore_green_difference = update_descore_green_us - update_descore_green_them;

    if (update_descore_green_us > update_descore_green_them) {
      status = "WIN";
    }

      else if (update_descore_green_us < update_descore_green_them) {
        status = "LOSE";
      }

        else {
          status = "TIE";
        }

        strategiesArray.push("The updated score (Us/Them) if you descore a green cube will be = ".concat(update_descore_green_us, "/", update_descore_green_them, " || ", status));

      

      return descore_green_difference;
  }
}


function descore_purple (score_us, score_them, purple_us, purple_them, purple_tower, status) {
  if (purple_tower == 0) {
    strategiesArray.push("You cannot descore a purple.");

  }

  else if (purple_tower > 0) {
    update_descore_purple_us = score_us - purple_us;
    update_descore_purple_them = score_them - purple_them;
    descore_purple_difference = update_descore_purple_us - update_descore_purple_them;

    if (update_descore_purple_us > update_descore_purple_them) {
      status = "WIN";
    }

      else if (update_descore_purple_us < update_descore_purple_them) {
        status = "LOSE";
      }

        else {
          status = "TIE";
        }

        strategiesArray.push("The updated score (Us/Them) if you descore a purple cube will be = ".concat(update_descore_purple_us, "/", update_descore_purple_them, " || ", status));

      return descore_purple_difference;
  }
}

function score_orange (score_us, score_them, orange_us, orange_them, orange_tower, status) {

    if (orange_tower >= 0) {
      update_score_orange_us = score_us + orange_us;
      update_score_orange_them = score_them + orange_them;
      score_orange_difference = update_score_orange_us - update_score_orange_them;

      if (update_score_orange_us > update_score_orange_them) {
        status = "WIN";
      }
        else if (update_score_orange_us < update_score_orange_them) {
          status = "LOSE"
        }
          else {
            status = "TIE";
          }
          strategiesArray.push("The updated score (Us/Them) if you score an orange cube will be = ".concat(update_score_orange_us, "/", update_score_orange_them, " || ", status));
    }
}


function score_green (score_us, score_them, green_us, green_them, green_tower, status) {

    if (green_tower >= 0) {
      update_score_green_us = score_us + green_us;
      update_score_green_them = score_them + green_them;
      score_green_difference = update_score_green_us - update_score_green_them;

      if (update_score_green_us > update_score_green_them) {
        status = "WIN";
      }
        else if (update_score_green_us < update_score_green_them) {
          status = "LOSE"
        }
          else {
            status = "TIE";
          }
          strategiesArray.push("The updated score (Us/Them) if you score a green cube will be = ".concat(update_score_green_us, "/", update_score_green_them, " || ", status));
    }
}

function score_purple (score_us, score_them, purple_us, purple_them, purple_tower, status) {

    if (purple_tower >= 0) {
      update_score_purple_us = score_us + purple_us;
      update_score_purple_them = score_them + purple_them;
      score_purple_difference = update_score_purple_us - update_score_purple_them;

      if (update_score_purple_us > update_score_purple_them) {
        status = "WIN";
      }
        else if (update_score_purple_us < update_score_purple_them) {
          status = "LOSE"
        }
          else {
            status = "TIE";
          }
          strategiesArray.push("The updated score (Us/Them) if you score a purple cube will be = ".concat(update_score_purple_us, "/", update_score_purple_them, " || ", status));
    }
}

function should_descore_filter (descore_orange_difference, descore_purple_difference, descore_green_difference, orange_tower, purple_tower, green_tower) {

  if (orange_tower ==0 && purple_tower ==0 && green_tower ==0 ) {
    strategiesArray.push("You cannot descore any cubes");
  }

  else if (orange_tower == 0) {
    
    if (descore_purple_difference >= descore_green_difference && purple_tower > 0) {
      strategiesArray.push("You should descore a purple cube");
    }
      else if (descore_green_difference >= descore_purple_difference && green_tower > 0) {
        strategiesArray.push("You should descore a green cube");
      }

  }

   else if (purple_tower == 0) {
    if (descore_orange_difference >= descore_green_difference && orange_tower > 0) {
      strategiesArray.push("You should descore an orange cube");
    }
      else if (descore_green_difference >= descore_orange_difference && green_tower > 0) {
        strategiesArray.push("You should descore a green cube");
      }
  }

    else if (green_tower == 0) {
    if (descore_orange_difference >= descore_purple_difference && orange_tower > 0) {
      strategiesArray.push("You should descore an orange cube");
}
        else if (descore_purple_difference >= descore_orange_difference && purple_tower > 0) {
          strategiesArray.push("You should descore a purple cube");
        }
    
  }

  else if (descore_orange_difference >= descore_purple_difference && descore_orange_difference >= descore_green_difference ) {
		strategiesArray.push("You SHOULD descore an orange cube");
	}
		else if (descore_purple_difference >= descore_orange_difference && descore_purple_difference >= descore_green_difference) {
			strategiesArray.push("You SHOULD descore a purple cube");
		}
			else if (descore_green_difference >= descore_orange_difference && descore_green_difference >= descore_purple_difference) {
				strategiesArray.push("You SHOULD descore a green cube");
			}

}

function should_score_filter (score_orange_difference, score_purple_difference, score_green_difference) {

  if (score_orange_difference >= score_purple_difference && score_orange_difference >= score_green_difference ) {
		strategiesArray.push("You SHOULD SCORE an ORANGE cube");
	}
		else if (score_purple_difference >= score_orange_difference && score_purple_difference >= score_green_difference) {
			strategiesArray.push("You SHOULD SCORE a PURPLE cube");
		}
			else if (score_green_difference >= score_orange_difference && score_green_difference >= score_purple_difference) {
				strategiesArray.push("You SHOULD SCORE a GREEN cube");
			}
				else {
					strategiesArray.push("You SHOULD NOT SCORE any cubes");
				}
}

function shouldnt_descore_filter (descore_orange_difference, descore_purple_difference, descore_green_difference, orange_tower, purple_tower,green_tower) {
  
  if (orange_tower == 0 && purple_tower == 0 && green_tower == 0) {
    strategiesArray.push("You cannot descore any cubes");
  }
  
  else if (orange_tower == 0) {
    
    if (descore_purple_difference <= descore_green_difference && purple_tower > 0) {
      strategiesArray.push("You should not descore a purple cube");
    }
      else if (descore_green_difference <= descore_purple_difference && green_tower > 0) {
        strategiesArray.push("You should not descore a green cube");
      }

  }

  else if (purple_tower == 0) {
    if (descore_orange_difference <= descore_green_difference && orange_tower > 0) {
      strategiesArray.push("You should not descore an orange cube");
    }
      else if (descore_green_difference <= descore_orange_difference && green_tower > 0 ) {
        strategiesArray.push("You should not descore a green cube");
      }
  }

  else if (green_tower == 0) {
    if (descore_orange_difference <= descore_purple_difference && orange_tower > 0 ) {
      strategiesArray.push("You should not descore an orange cube");
}
        else if (descore_purple_difference <= descore_orange_difference && purple_tower > 0) {
          strategiesArray.push("You should not descore a purple cube");
        }
    
  }

  else if (descore_orange_difference <= descore_purple_difference && descore_orange_difference <= descore_green_difference ) {
		strategiesArray.push("You SHOULD not descore an orange cube");
	}
		else if (descore_purple_difference <= descore_orange_difference && descore_purple_difference <= descore_green_difference) {
			strategiesArray.push("You SHOULD not descore a purple cube");
		}
			else if (descore_green_difference <= descore_orange_difference && descore_green_difference <= descore_purple_difference) {
				strategiesArray.push("You SHOULD not descore a green cube");
			}
}

function shouldnt_score_filter (score_orange_difference, score_purple_difference, score_green_difference) {

  if (score_orange_difference <= score_purple_difference && score_orange_difference <= score_green_difference ) {
		strategiesArray.push("You SHOULD NOT SCORE an ORANGE cube");
	}
		else if (score_purple_difference <= score_orange_difference && score_purple_difference <= score_green_difference) {
			strategiesArray.push("You SHOULD NOT SCORE a PURPLE cube");
		}
			else if (score_green_difference <= score_orange_difference && score_green_difference <= score_purple_difference) {
				strategiesArray.push("You SHOULD NOT SCORE a GREEN cube");
			}

}

function opponent_score (score_orange_difference, score_purple_difference, score_green_difference, opponent_1, opponent_2) {

  if (score_orange_difference <= score_purple_difference && score_orange_difference <= score_green_difference ) {
		strategiesArray.push("There is a HIGH probability that ".concat(opponent_1, " & ", opponent_2, " WILL SCORE an ORANGE cube"));
	}
		else if (score_purple_difference <= score_orange_difference && score_purple_difference <= score_green_difference) {
			strategiesArray.push("There is a HIGH probability that ".concat(opponent_1, " & ", opponent_2, " WILL SCORE a PURPLE cube"));
		}
			else if (score_green_difference <= score_orange_difference && score_green_difference <= score_purple_difference) {
				strategiesArray.push("There is a HIGH probability that ".concat(opponent_1, " & ", opponent_2, " WILL SCORE a GREEN cube"));
			}

}

function output_list() {
  let message = "<br>";

  for (let i = 0; i < strategiesArray.length; i++) {
    message += "<li>" + strategiesArray[i] + "</li>";
  }

  document.getElementById("strategies").innerHTML = message;
  strategiesArray = [];
}

function opponents() {
  opponent_1 = document.getElementById("opponent1").value;
  opponent_2 = document.getElementById("opponent2").value;
}

// current_score_output ();
// descore_orange (score_us, score_them, orange_us, orange_them, orange_tower, status);
// descore_green (score_us, score_them, green_us, green_them, green_tower, status);
// descore_purple (score_us, score_them, purple_us, purple_them, purple_tower, status);

// score_orange (score_us, score_them, orange_us, orange_them, orange_tower, status );
// score_green(score_us, score_them, green_us, green_them, green_tower, status);
// score_purple(score_us, score_them, purple_us, purple_them, purple_tower, status);

// should_descore_filter (descore_orange_difference, descore_purple_difference, descore_green_difference, orange_tower, purple_tower, green_tower);
// should_score_filter (score_orange_difference, score_purple_difference, score_green_difference);

// shouldnt_descore_filter (descore_orange_difference, descore_purple_difference, descore_green_difference, orange_tower, purple_tower, green_tower);
// shouldnt_score_filter (score_orange_difference, score_purple_difference, score_green_difference);

// opponent_score(score_orange_difference, score_purple_difference, score_green_difference, opponent_1, opponent_2)
// output_list()


















