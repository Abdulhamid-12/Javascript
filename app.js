// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Create Dino Objects
let dion_objects = {};
let facts_array = new Array(8);

// Create Human Object
const human = {};

// Use IIFE to get human data from form
function validateForm() {
  let isFilled = false;
  const name = document.getElementById("name").value;
  const feet = document.getElementById("feet").value;
  const inches = document.getElementById("inches").value;
  const weight = document.getElementById("weight").value;
  const diet = document.getElementById("diet").value;

  if (name == "" || feet == "" || inches == "" || weight == "" || diet == "") {
    alert("Please fill all data!");
  } else {
    isFilled = true;
    human.name = name;
    human.feet = parseFloat(feet);
    human.inches = parseInt(inches);
    human.weight = parseInt(weight);
    human.diet = diet;
  }

  return isFilled;
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

function compare1(human, dino) {
  let fact;
  human_height = human.feet * 12 + human.inches;
  dino_height = dino.height;

  let difference = Math.abs(dino_height - human_height);

  if (dino_height > human_height) {
    fact = `${dino.species} is ${difference} inches higher than ${human.name}`;
  } else {
    fact = `${human.name} is ${difference} inches higher than ${dino.species}`;
  }

  return fact;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compare2(human, dino) {
  let fact;
  human_weight = human.weight;
  dino_weight = dino.weight;

  let difference = Math.abs(dino_weight - human_weight);

  if (dino_height > human_height) {
    fact = `${dino.species} is ${difference} lbs heavier than ${human.name}`;
  } else {
    fact = `${human.name} is ${difference} lbs heavier than ${dino.species}`;
  }

  return fact;
}
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compare3(human, dino) {
  let fact;
  human_diet = human.diet.toLowerCase();
  dino_diet = dino.diet;

  if (dino_diet == human_diet) {
    fact = ` ${dino.species} and ${human.name} are both ${dino_diet}`;
  } else {
    fact = `${human.name} is ${human_diet} while ${dino.species} is ${dino_diet}`;
  }

  return fact;
}
const mainGrid = document.getElementById("grid");
mainGrid.style.display = "none";
// mainGrid.style.opacity = 0;

// Generate Tiles for each Dino in Array
const images_src = [
  "images/triceratops.png",
  "images/tyrannosaurus rex.png",
  "images/anklyosaurus.png",
  "images/brachiosaurus.png",
  "images/human.png",
  "images/stegosaurus.png",
  "images/pigeon.png",
  "images/pteranodon.png",
  "images/elasmosaurus.png",
];

document.getElementById("reset").style.display = "none";

// Add tiles to DOM
const gridImg = document.querySelectorAll(".grid-item img");
const facts = document.querySelectorAll(".grid-item p");
let humanName = document.querySelector(".grid-item:nth-child(5) h3");

gridImg.forEach((image, index) => {
  image.src = images_src[index];
});

// On button click, prepare and display infographic
document.getElementById("btn").onclick = function () {
  let validated = validateForm();
  if (validated) {
    fetch("dino.json")
      .then((Response) => Response.json())
      .then((json) => {
        for (let i = 0; i < json.Dinos.length; i++) {
          dion_objects[i] = json.Dinos[i];
        }
      })
      .then(function randomFacts() {
        let bool;
        let num_of_compared_facts = 0;
        let jsonIndex = 0;

        // itrating through grid items
        for (let i = 0; i < 9; i++) {
          bool = Math.random() < 0.6;
          jsonIndex = i == 5 ? 4 : i == 6 ? 7 : i == 7 ? 6 : i == 8 ? 5 : i;
          if (num_of_compared_facts != 3 && bool && i != 4 && i != 6) {
            if (num_of_compared_facts == 0) {
              facts[i].innerHTML = compare1(human, dion_objects[jsonIndex]);
            } else if (num_of_compared_facts == 1) {
              facts[i].innerHTML = compare2(human, dion_objects[jsonIndex]);
            } else if (num_of_compared_facts == 2) {
              facts[i].innerHTML = compare3(human, dion_objects[jsonIndex]);
            }
            num_of_compared_facts++;
          } else if (i != 4) {
            facts[i].innerHTML = dion_objects[jsonIndex].fact;
          }
        }
      });
    humanName.innerHTML = human.name;
    // Remove form from screen and display main grid
    document.getElementById("dino-compare").style.display = "none";
    mainGrid.classList.add("grid-animation");
    mainGrid.style.display = "flex";
    document.getElementById("reset").style.display = "block";
  }

  document.getElementById("reset").onclick = function () {
    mainGrid.style.display = "none";
    document.getElementById("dino-compare").style.display = "block";
    document.getElementById("reset").style.display = "none";
  };
};
