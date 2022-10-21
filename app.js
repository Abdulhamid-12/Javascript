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
var dion_objects = {};

fetch("dino.json")
  .then((Response) => Response.json())
  .then((json) => {
    for (var i = 0; i < json.Dinos.length; i++) {
      dion_objects[i] = new Dino(json.Dinos[i]);
    }
  });

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

  if (!name || !feet || !inches || !weight || !diet) {
    alert("Please fill all data!");
  } else {
    isFilled = true;
    human.name = name;
    human.feet = feet;
    human.inches = inches;
    human.weight = weight;
    human.diet = diet;
  }

  return isFilled;
}
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

function compare1(human, dion) {}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compare2(human, dion) {}
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compare3(human, dion) {}
const mainGrid = document.getElementById("grid");
mainGrid.style.display = "none";

// Generate Tiles for each Dino in Array
const images_src = [
  "images/anklyosaurus.png",
  "images/brachiosaurus.png",
  "images/elasmosaurus.png",
  "images/pigeon.png",
  "images/pteranodon.png",
  "images/stegosaurus.png",
  "images/triceratops.png",
  "images/tyrannosaurus rex.png",
];
const human_img = "images/human.png";

// Add tiles to DOM
let gridImg = document.querySelectorAll("img");

gridImg.forEach((item, index) => {
  let random_src = Math.floor(Math.random() * 8);
  if (index == 4) {
    item.src = human_img;
  } else {
    item.src = images_src[random_src];
  }
});

// On button click, prepare and display infographic
document.getElementById("btn").onclick = function () {
  let validated = validateForm();
  if (validated) {
    // Remove form from screen and display main grid
    document.getElementById("dino-compare").style.display = "none";
    mainGrid.style.display = "flex";
  }
};
