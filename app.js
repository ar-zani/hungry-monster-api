//Handling search button click
function searchItem() {
    console.log("search clicked");
    const input = document.getElementById('user-input').value;
    const row =  document.getElementById('row');
    row.innerHTML='';
    if(input.length<1){
        const errorMassage = `
        <div class="text-center">
            <h6 class="text-danger">Please search with a food name</h6>

        </div>
        `
        row.innerHTML= errorMassage;
        row.classList.remove("row-cols-4");
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch( () => searchError(input))
    }
}


//Displaying Food items 
const displayMeals = meals => {
    row.classList.add("row-cols-4");
    meals.forEach(meal => {
        const displayMeal = `
        <div class="col">
                <div class="card border-0" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="mealDetailsView(${meal.idMeal})">
                    <img src="${meal.strMealThumb}/preview" alt="${meal.strMeal}">
                    <div class="card-body custom-card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                    </div>
                </div>
        </div>
        `
        document.getElementById('row').innerHTML += displayMeal;
    });
}


//handling search error if no food item found
const searchError = (input) =>{
    const errorMassage = `
    <div class="text-center">
        <h6 class="text-danger">SORRY!!! Your searched food "<span class="text-dark">${input}</span>" did not match with any of our food products</h6>
    <p class="text-success">Search again with another one...</p>
    </div>
    `
    row.innerHTML= errorMassage;
    row.classList.remove("row-cols-4");
}


//displaying food details
const mealDetailsView = meal =>{
    console.log(+meal);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${+meal}`)
    .then(res => res.json())
    .then(data => displayDetails(data.meals[0]))
}

const displayDetails = items =>{
    console.log(items);
    const imgUrl=`${items.strMealThumb}/preview`
    document.getElementById('details-title').innerText=items.strMeal;
    document.getElementById('details-image').src = imgUrl;
    let ul = document.getElementById('ingredient-list');
    ul.innerHTML='';
    for (const props in items) {
        if(props.substr(3,10) == 'Ingredient'){
            if(items[props].length>1){
                const li =`
            <li><img src="images/tic.png"> ${items[props]}</li>
            `
            ul.innerHTML+=li;  
            }         
        }
    }
}