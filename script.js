const searchBtn = document.getElementById('recipe-search');
let mealList = document.getElementById('meal');
let mealDetailsContent = document.querySelector('.meal-details-content');
let mealTime = document.getElementById('meal-time');
let cuisineType = document.getElementById('cuisine-type');

for (let i = 0; i < 6; i++) {
    // const checkbox`${i}` = document.getElementById(`check${i}`);
}

// event listeners
searchBtn.addEventListener('submit', getMealList);


// get meal list that matches with the ingredients
async function getMealList(event) {
    const baseURL = "https://api.edamam.com/search?";
    const APP_ID = '3e505aa4'
    const appID = `app_id=${APP_ID}`;
    const API_KEY = '45522e7d11757a45d7cbc588999ef9c3'
    const appKey = `&app_key=${API_KEY}`;
    let searchInputTxt = document.getElementById('search-bar').value.trim();

    let fetchURL = `${baseURL}${appID}${appKey}&q=${searchInputTxt}`;
    // let fetchURL = `${baseURL}${appID}${appKey}&q=${query}`;
    
    event.preventDefault();
    let response = await fetch(fetchURL);
    let data = await response.json()
    useApiData(data)
}
// fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${searchInputTxt}`)

function useApiData(data) {
    console.log(data)
    let html = "";
    if (data.hits.length > 0) {
        data.hits.forEach(({recipe}) => {
            html += `
        <div class="col-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <img src="${recipe.image}" class="card-img-top mb-2" alt="...">
              <div class='card-details'>
                <span class='mr-2'>👤 ${recipe.yield}</span>
                <span class="mr-2 badge badge-dark">Cal: ${Math.floor(recipe.calories)}</span>
                <span class="mr-1 badge badge-success"> ${recipe.healthLabels[0]}</span>
              </div>
              <h4 class="card-title text-primary mt-1">${recipe.label}</h4>
            </div>  
          </div>
        </div>`;
        });
        mealList.classList.remove('notFound');
    } else {
        html = "Sorry, we couldn't find the meal you were looking for.";
        mealList.classList.add('notFound');
    }

    mealList.innerHTML = html;
}




function mealTimeQuerySelector(mealTime) {
    let mealQuery;
    switch (mealTime.value) {
        case 1:
            mealQuery = 'Breakfast';
            break;
        case 2:
            mealQuery = 'Lunch';
            break;
        case 3:
            mealQuery = 'Dinner';
            break;
        case 4:
            mealQuery = 'Snack';
            break;
        case 5:
            mealQuery = 'Teatime';
            break;
        default:
            mealQuery = '';
    }
    return mealQuery;
}

function cuisineQuerySelector(cuisineType) {
    let cuisineQuery;
    switch (cuisineType.value) {
        case 1:
            cuisineQuery = 'American';
            break;
        case 2:
            cuisineQuery = 'Asian';
            break;
        case 3:
            cuisineQuery = 'British';
            break;
        case 4:
            cuisineQuery = 'Carribean';
            break;
        case 5:
            cuisineQuery = 'Central Europe';
            break;
        case 6:
            cuisineQuery = 'Chinese';
            break;
        case 7:
            cuisineQuery = 'Eastern Europe';
            break;
        case 8:
            cuisineQuery = 'French';
            break;
        case 9:
            cuisineQuery = 'Indian';
            break;
        case 10:
            cuisineQuery = 'Italian';
            break;
        case 11:
            cuisineQuery = 'Japanese';
            break;
        case 12:
            cuisineQuery = 'Mediterranean';
            break;
        case 13:
            cuisineQuery = 'Mexican';
            break;
        case 14:
            cuisineQuery = 'Middle Eastern';
            break;
        case 15:
            cuisineQuery = 'South American';
            break;
        default:
            cuisineQuery = '';
    }
    return cuisineQuery;
}