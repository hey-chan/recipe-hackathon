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
                    <img src="${recipe.image}" class="card-img-top mb-2" alt="...">
                    <div class="card-body">
                      <h4 class="card-title">${recipe.label}</h4>
                      <a href="#" class="btn btn-primary">Pill.1</a>
                      <a href="#" class="btn btn-info">Pill.2</a>
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

