const searchBtn = document.getElementById('recipe-search');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');

// event listeners
searchBtn.addEventListener('submit', getMealList);


// get meal list that matches with the ingredients
function getMealList(event){
    event.preventDefault();
    console.log('hello')
    let APP_ID = '3e505aa4'
    let API_KEY = '45522e7d11757a45d7cbc588999ef9c3'
    let searchInputTxt = document.getElementById('search-bar').value.trim();
    fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        console.log(data)
        if(data.hits){
            data.hits.forEach(({recipe}) => {
                html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${recipe.image}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${recipe.label}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}