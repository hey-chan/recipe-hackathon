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
                <div class="col mb-4">
                  <div class="card h-100">
                    <div class="card-body">
                        <img src="${recipe.image}" class="card-img-top mb-2" alt="...">
                        <div class='card-details'>
                            <span class="badge badge-dark">Cals: ${Math.floor(recipe.calories)}</span>
                            <span class='ml-2'>👤 ${recipe.yield}</span>
                            <span class="badge badge-success"> ${recipe.healthLabels[0]}</span>
                        </div>
                        <h4 class="card-title text-primary mt-1">${recipe.label}</h4>
                    </div>
                    
                  </div>
                </div>`
                ;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}