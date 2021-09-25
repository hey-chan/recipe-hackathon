const searchBtn = document.getElementById("recipe-search");
let mealList = document.getElementById("meal");
let mealDetailsContent = document.querySelector(".meal-details-content");
const findRecipesButton = document.getElementById("find-recipes");

// API request URL sections
const baseURL = "https://api.edamam.com/search?";
const APP_ID = "3e505aa4";
const API_KEY = "45522e7d11757a45d7cbc588999ef9c3";
// const appID = `app_id=${APP_ID}`;
// const appKey = `&app_key=${API_KEY}`;

for (let i = 0; i < 6; i++) {
  // const checkbox`${i}` = document.getElementById(`check${i}`);
}

// event listeners
searchBtn.addEventListener("submit", getMealList);
findRecipesButton.addEventListener("submit", findRecipes);

// get meal list that matches with the ingredients
async function getMealList(event) {
  let searchInputTxt = document.getElementById("search-bar").value.trim();
  let fetchURL = `${baseURL}app_id=${APP_ID}&app_key=${API_KEY}&q=${searchInputTxt}`;
  event.preventDefault();
  let response = await fetch(fetchURL);
  let data = await response.json();
  console.log(data);
  useApiData(data);
  addClickEventListener(data);
}

// fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${searchInputTxt}`)

async function findRecipes(event) {
  let mealTime = document.getElementById("meal-time").value;
  let cuisineType = document.getElementById("cuisine-type").value;
  let query = `${mealTime}&q=${cuisineType}`;

  console.log(mealTime);
  console.log(cuisineType);
  console.log(query);

  // =====================================================
  //  Do this or should we do each element by ID then use if checkbox/object.checked
  // =====================================================

  console.log(fetchURL);

  let checkboxes = document.querySelectorAll("form-check-input");

  let fetchURL = `${baseURL}app_id=${APP_ID}&app_key=${API_KEY}&q=${query}`;
  event.preventDefault();
  let response = await fetch(fetchURL);
  let data = await response.json();
  useApiData(data);
  addClickEventListener(data);
}

function buildCardView(recipe) {
  // change contents of mealList
  console.log("I WAS CLICKED");
  let mainWindow = document.getElementById("main-section");
  let {
    totalNutrients,
    totalDaily,
    calories,
    yield,
    ingredients,
    image,
    healthLabels,
    cuisineType,
    label,
    url,
  } = recipe;
  console.log(
    totalNutrients,
    totalDaily,
    calories,
    yield,
    ingredients,
    image,
    healthLabels,
    cuisineType,
    label,
    url
  );
  mainWindow.innerHTML = `<h1> ${recipe.label} </h1>
  <img src=${image} />
  <h2>Ingredients</h2>
  ${ingredientBulletDisplay(ingredients)}
  ${nutritionDisplay(totalNutrients, totalDaily)}
  `;
}

function nutritionDisplay(nutrientWeight, dailyIntake) {
  const nutritionList = nutritionDataArrangement(nutrientWeight, dailyIntake);
  console.log(`THIS IS THE NUTRIENT LIST: ${nutrientList}`)
  return nutritionList;
}

function nutritionDataArrangement(nutrientWeight, dailyIntake) {
  console.log('This is the nutrientWeight object');
  console.log(nutrientWeight);
  const nutrientObject = {};
  Object.entries(dailyIntake).forEach((key) => {
    console.log(`This is the % daily intake: ${key[1].label} ${key[1].quantity.toFixed(1)} ${key[1].unit}`);
  })
  
  Object.entries(nutrientWeight).forEach((nutrient) => {
    console.log(`This is the nutrient label: ${nutrient[1].label}`);
    console.log(`This is the nutrient quantity: ${nutrient[1].quantity.toFixed(1)}`);
    console.log(`This is the nutrient unit: ${nutrient[1].unit}`);
    // nutrientObject.push({nutrient: {"label": `${nutrient.label}`, "quantity": `${nutrient.quantity} ${nutrient.unit}`}})
  });
  console.log(nutrientObject);

  


  return nutrientObject;
}

function ingredientBulletDisplay(ingredients) {
  const listOfIngredients = displayIngredients(ingredients);
  return formatHTMLIngredients(listOfIngredients);
}

function formatHTMLIngredients(items) {
  let htmlOutput = ["<ul>"];
  items.forEach(item => {
    htmlOutput.push(`<li class='mb-3'>${item}</li>\n`)
  })
  htmlOutput.push("</ul>");
  return htmlOutput.join('');
}

function displayIngredients(ingredients) {
  const ingredientArray = []
  ingredients.forEach((item) => {
    ingredientArray.push(item.text);
  })
  return ingredientArray;
}

function createClickEvent(node, recipe) {
  console.log(`This is the node: ${node}`);
  node.addEventListener("click", () => {
    console.log("i got clicked, THIS IS THE CREATE CLICK EVENT");
    buildCardView(recipe);
  });
}

function addClickEventListener(data) {

  const recipeCard = document.querySelector(".clickMe");
  console.log(`Does this get printed? ${recipeCard}`);
  console.log(data.hits[0]);
  let recipe = data.hits[0].recipe
  createClickEvent(recipeCard, recipe);

  // recipeCard.forEach((cardObject) => {
  //   createClickEvent(cardObject, recipe);
  // })
}

function createCard(recipe, id) {
  console.log(`this is the recipe id: ${id}`);
  const card = document.createElement("div");
  let dietRequirements = filterHealthLabels(recipe.healthLabels);

  card.classList.add("col", "mb-4", "clickMe");
  card.id = id;
  card.innerHTML = `<div class="card h-100">
      <div class="card-body">
        <img src="${recipe.image}" class="card-img-top mb-2" alt="${recipe.label}">
        <div class='card-details'>
          <div class='row'> 
            <span class='col'>Serves: 👤 ${recipe.yield}</span>
            <span class="col mr-4 badge badge-dark my-auto">Cal: ${Math.floor(recipe.calories)}</span>
          </div>
          ${badgeWordFunction(dietRequirements)}
        </div>
        <a href=${recipe.url} class="card-title text-primary mt-1"><h2>${recipe.label}</h2></a>
      </div>  
    </div>`;
    // let clickAdder = document.getElementById(`${id}`);
    
// function calls go back here.......

mealList.appendChild(card);

}


function badgeWordFunction(diet) {
  let dietaryDisplay = "";
  const dietsTotal = diet.length;
  if (dietsTotal >= 2) {
    return (dietaryDisplay = `
    <div class='row mt-2 mx-auto'>  
     <span class="col mr-2 badge badge-success"> ${diet[0]}</span>
      <span class="col mr-2 badge badge-success"> ${diet[1]}</span>
    </div>`);
  } else if (dietsTotal === 1) {
    return (dietaryDisplay = `
    <div class='row mt-2 mx-auto'>  
     <span class="col mr-2 badge badge-success"> ${diet[0]}</span>
     <span class="col"> </span>
    </div>`);
  } else {
    return dietaryDisplay;
  }
}

function useApiData(data) {
  console.log(data);

  let html = "";
  if (data.hits.length > 0) {
    data.hits.forEach(({ recipe }, index) => {
      createCard({recipe}.recipe, `recipe${index}`);

      // addClickEventListener({recipe}.recipe, `recipe${index}`)


      // .then(createClickEvent(clickAdder, recipe))
      // .then(mealList.appendChild(card));
    });
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
        link.style.animation = `navLinkFade 0.2s ease forwards ${index / 6}s`;
      }
    });
  });
};

navSlide();
