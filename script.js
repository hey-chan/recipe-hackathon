const searchBtn = document.getElementById("recipe-search");
let mealList = document.getElementById("meal");
let mealDetailsContent = document.querySelector(".meal-details-content");
const findRecipesButton = document.getElementById('find-recipes');

// API request URL sections
const baseURL = "https://api.edamam.com/search?";
const APP_ID = "3e505aa4";
const appID = `app_id=${APP_ID}`;
const API_KEY = "45522e7d11757a45d7cbc588999ef9c3";
const appKey = `&app_key=${API_KEY}`;

for (let i = 0; i < 6; i++) {
  // const checkbox`${i}` = document.getElementById(`check${i}`);
}

// event listeners
searchBtn.addEventListener('submit', getMealList);
findRecipesButton.addEventListener('submit', findRecipes);

// get meal list that matches with the ingredients
async function getMealList(event) {
  let searchInputTxt = document.getElementById("search-bar").value.trim();
  let fetchURL = `${baseURL}${appID}${appKey}&q=${searchInputTxt}`;
  event.preventDefault();
  let response = await fetch(fetchURL);
  let data = await response.json();
  useApiData(data);
}
// fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${searchInputTxt}`)

async function findRecipes(event) {
  let mealTime = document.getElementById('meal-time');
  let cuisineType = document.getElementById('cuisine-type');
  let query = `${mealTime}&q=${cuisineType}`;

  console.log(mealTime, cuisineType, query);

// =====================================================
//  Do this or should we do each element by ID then use if checkbox/object.checked
// =====================================================
  
  let checkboxes = document.querySelectorAll('form-check-input');

  let fetchURL = `${baseURL}${appID}${appKey}&q=${query}`;
  event.preventDefault();
  let response = await fetch(fetchURL);
  let data = await response.json();
  useApiData(data);
}

function buildCardView(recipe) {
    // change contents of mealList
    let mainWindow = document.getElementById('main-section'); 
    console.log("I WAS CLICKED");
    let { totalNutrients, totalDaily, calories, yield, ingredients, image, healthLabels, cuisineType, label, url } = recipe; 
    console.log(totalNutrients, totalDaily, calories, yield, ingredients, image, healthLabels, cuisineType, label, url);
    mainWindow.innerHTML = `<h1> ${recipe.label} </h1>`
}

function createClickEvent(node, recipe) {
    node.addEventListener('click', () => {
        console.log('i got clicked');
        buildCardView(recipe);
    })
}

function createCard(recipe, id) {
    const card = document.createElement('div');
    let dietRequirements = filterHealthLabels(recipe.healthLabels);

    card.classList.add('col', 'mb-4');
    card.id = id; 
    card.innerHTML = `<div class="card h-100">
    <div class="card-body">
      <img src="${recipe.image}" class="card-img-top mb-2" alt="${recipe.label}">
      <div class='card-details'>
        <div class='row'> 
          <span class='col mr-1'>Serves: 👤 ${recipe.yield}</span>
          <span class="col mr-3 badge badge-dark my-auto">Cal: ${Math.floor(recipe.calories)}</span>
        </div>
        <div class='row mt-2 mx-auto'>  
          <span class="col mr-2 badge badge-success"> ${dietRequirements[0]}</span>
          <span class="col mr-2 badge badge-success"> ${dietRequirements[1]}</span>
        </div>
        
        <div class='row mt-1 mx-auto'>  
          <span class="col mr-2 badge badge-success"> ${dietRequirements[2]}</span>
          <span class="col mr-2 badge badge-success"> ${dietRequirements[3]}</span>
        </div>
      </div>
      <h4 class="card-title text-primary mt-1">${recipe.label}</h4>
    </div>  
  </div>`
    createClickEvent(card, recipe);
//   card.addEventListener('click', (event) => console.log("CLICKEDY CLICK"));
//   buildCardView(recipe)
  mealList.appendChild(card);
}

function useApiData(data) {
    console.log(data);
    
    let html = "";
    if (data.hits.length > 0) {
        data.hits.forEach(({ recipe }, index) => {
        createCard({recipe}.recipe, index)
      });
      // <div class='row d-flex flex-direction-row justify-content-between'>
      mealList.classList.remove("notFound");
    } else {
      html = "Sorry, we couldn't find the meal you were looking for.";
      mealList.classList.add("notFound");
    }
    mealList.innerHTML += html;
}

function filterHealthLabels(diets) {
  const dietFilters = [
    "Dairy-Free",
    "Gluten-Free",
    "Pork-Free",
    "Keto-Friendly",
    "Tree-Nut-Free",
    "Vegan",
    "Vegetarian",
    "Wheat-Free",
  ];
  const filteredDiets = diets.filter((word) => dietFilters.includes(word));
  return changeWords(filteredDiets);
}

function changeWords(diets) {
  let badgeOutput = [];
  diets.forEach((diet) => {
    if (diet == "Pork-Free") {
      badgeOutput.push("Halal");
    } else if (diet == "Keto-Friendly") {
      badgeOutput.push("Keto");
    } else if (diet == "Tree-Nut-Free") {
      badgeOutput.push("Nut-Free");
    } else {
      badgeOutput.push(diet);
    }
  });
  return badgeOutput;
}

// Front end sidebar
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  //toggle//
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    //animate link
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.2s ease forwards ${
          index / 6}s`;
      }
    });
  });
};

navSlide();