const sidebar = document.querySelector(".aside-btn");
const aside = document.querySelector("aside");
const closeIcon = document.querySelector(".bar-main-icon");
const elementsList = document.getElementsByClassName("element-list");
sidebar.addEventListener("click", function () {
    aside.classList.toggle('collapsed-aside');
    closeIcon.classList.toggle("fa-bars");
    closeIcon.classList.toggle("fa-xmark");
    for (let i = 0; i < elementsList.length; i++) {
        elementsList[i].classList.toggle("moving_up");
        elementsList[i].classList.toggle("moving_down");
    }
})
const main = document.querySelector("main")
main.addEventListener('click', function(){
    aside.classList.remove('collapsed-aside');
    closeIcon.classList.remove("fa-xmark");
    closeIcon.classList.add("fa-bars");
})

async function homePage(){
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    request = await request.json();
    let data = await request.meals;
    let homeHTML = `
                <div class="container py-5">
                    <div class="row g-4">`;
    for(let i = 0 ; i<data.length ; i++)
    {
        homeHTML+=`
                    <div class=" col-lg-3 text-white overflow-hidden  ">
                        <div onclick="getMealngredients('${data[i].idMeal}')")" class="category-contant position-relative">
                            <img class="image w-100" src="${data[i].strMealThumb}" alt="category photo">
                                <div class="details d-flex  align-items-center">
                                    <h2 class="text-center">${data[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                        `;
    }
    homeHTML += `
                </div>
            </div>`;
    main.innerHTML = homeHTML;
}
loader = document.getElementById('loader');
window.addEventListener("load", function(){
    homePage();
    loader.classList.add('d-none')
}) 
const container = document.querySelector("#container")
const contant = document.querySelector('div#contant')
function showSearchInputs()
{
    main.innerHTML = ``
    
    container.innerHTML= `
    <div class="container">
            <div class="row py-4 ">
                <div class="col-md-6 ">
                    <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
                </div>
                <div class="col-md-6">
                    <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
                </div>
            </div>
        </div>`
}
async function searchByName(mealName){
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    request = await request.json();
    let data = await request.meals;
    let html = `
                <div class="container py-5">
                    <div class="row g-4">`;
    for(let i = 0 ; i<data.length ; i++)
    {
        html+=`
                    <div class=" col-lg-3 text-white overflow-hidden  ">
                        <div onclick="getMealngredients('${data.idMeal}')")" class="category-contant position-relative">
                            <img class="image w-100" src="${data[i].strMealThumb}" alt="category photo">
                                <div class="details d-flex  align-items-center">
                                    <h2 class="text-center">${data[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                        `;
    }
    html += `</div>
        </div>`;
    contant.innerHTML = html;
}
async function searchByFLetter(l){
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
    request = await request.json();
    let data = await request.meals;
    let html = `
                <div class="container py-5">
                    <div class="row g-4">`;
    for(let i = 0 ; i<data.length ; i++)
    {
        html+=`
                    <div class=" col-lg-3 text-white overflow-hidden  ">
                        <div onclick="getMealngredients('${data.idMeal}')")" class="category-contant position-relative">
                            <img class="image w-100" src="${data[i].strMealThumb}" alt="category photo">
                                <div class="details d-flex  align-items-center">
                                    <h2 class="text-center">${data[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                        `;
    }
    html += `
                </div>
            </div>`;
    contant.innerHTML = html

}
async function getCategories(){
    let API_LINK = "https://www.themealdb.com/api/json/v1/1/categories.php"
    let getCategory = await fetch(API_LINK);
    getCategory = await getCategory.json();
    return getCategory;
}
async function displayCategory() {
    let categoriesData = await getCategories();
    let categories = categoriesData.categories; 
    let html = `
                <div class="container py-5">
                    <div class="row g-4">`;
    for(let i = 0 ; i<categories.length ; i++)
    {
        html+=`
                    <div class=" col-lg-3 text-white overflow-hidden  ">
                        <div onclick="getCategoryMeals('${categories[i].strCategory}')" class="category-contant position-relative">
                            <img class="image w-100" src="${categories[i].strCategoryThumb}" alt="category photo">
                                <div class="details">
                                    <h2 class="text-center">${categories[i].strCategory}</h2>
                                    <h6 >${lessWords(categories[i].strCategoryDescription)} </h6>
                                </div>
                            </div>
                        </div>
                        `;
    }
    html += `
                </div>
            </div>`;
    main.innerHTML = html
}

async function getCategoryMeals(category) {
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    data = await request.json();
    let mealData = await data.meals;
    let html = `
                <div class="container py-5">
                    <div class="row g-4">`;
    mealData.forEach(meal => {
        html+=`
                    <div class="col-sm-6 col-md-4 col-lg-3 text-white overflow-hidden  ">
                        <div onclick="getMealngredients('${meal.idMeal}')" class="category-contant position-relative">
                            <img class="image w-100" src="${meal.strMealThumb}" alt="category photo">
                                <div class="details d-flex align-items-center">
                                    <h2 class="text-center">${meal.strMeal}</h2>
                                </div>
                            </div>
                        </div>
                        `;
    })
    html += `
                </div>
            </div>`;
    main.innerHTML = html

}


async function getArea() {
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    data = await request.json();
    let AreaName = await data.meals;
    let html = `
                <div class="container py-5">
                    <div class="row g-4">`;
    AreaName.forEach(city => {
        html+=`
                <div class=" col-sm-6 col-md-3 text-white">
                    <div onclick="getAreaMeals('${city.strArea}')" class="rounded-2 text-center cursor-pointer">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${city.strArea}</h3>
                    </div>
                </div>
                        `;
    })
    html += `
                </div>
            </div>`;
    main.innerHTML = html

}
async function getAreaMeals(cityName) {
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cityName}`);
    data = await request.json();
    let AreaData = await data.meals;
    let html = `
                <div class="container py-5">
                    <div class="row g-4">`;
    AreaData.forEach(city => {
        html+=`
                    <div class="col-sm-6 col-md-4 col-lg-3 text-white overflow-hidden  ">
                        <div onclick="getMealngredients('${city.idMeal}')" class="category-contant position-relative">
                            <img class="image w-100" src="${city.strMealThumb}" alt="Area icon">
                                <div class="details d-flex align-items-center">
                                    <h2 class="text-center">${city.strMeal}</h2>
                                </div>
                            </div>
                        </div>
                        `;
    })
    html += `
                </div>
            </div>`;
    main.innerHTML = html
}
async function getIngredients() {
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    data = await request.json();
    let Ingrdient = await data.meals;
    let html = `
                <div class="container py-5">
                    <div class="row g-4">`;
                for(const mainIngrdient of Ingrdient){
                    if(!mainIngrdient.strDescription)
                    { 
                        break
                    }
                        html+=`
                                <div class=" col-sm-6 col-md-3 text-white">
                                    <div onclick="getMeals('${mainIngrdient.strIngredient}')" class="rounded-2 text-center cursor-pointer">
                                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                                            <h4>${mainIngrdient.strIngredient}</h4>
                                            <h6 >${lessWords(mainIngrdient.strDescription)}</h6>
                                    </div>
                                </div>
                                        `;
                }
    html += `
                </div>
            </div>`;
    main.innerHTML = html

}

async function getMeals(mainIngredient) {
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`);
    data = await request.json();
    let Ingrdient = await data.meals;
    let html = `
                <div class="container py-5">
                    <div class="row g-4">`;
                Ingrdient.forEach(i => {
                        html+=`
                                <div class="col-sm-6 col-md-4 col-lg-3 text-white overflow-hidden  ">
                                <div onclick="getMealngredients('${i.idMeal}')" class="category-contant position-relative">
                                    <img class="image w-100" src="${i.strMealThumb}" alt="Area icon">
                                    <div class="details d-flex align-items-center">
                                        <h2 class="text-center">${i.strMeal}</h2>
                                    </div>
                                    </div>
                                </div>
                                        `;
                })
    html += `
                </div>
            </div>`;
    main.innerHTML = html;
}
async function getMealngredients(idMeal) {
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    data = await request.json();
    let meal = await data.meals[0];
    console.log(meal)
    let html =`
    <div class="container">
            <div class="row py-5 g-4 " id="rowData">
            <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                `;
    for(let i =1; i<= 20; i++)
    {
        let measure= meal[`strMeasure${i}`]
        let ingredients= meal[`strIngredient${i}`]
        if(!(ingredients && measure)){
            break;
        }
        html += `
                        <li class="alert alert-info m-2 p-1">${measure} ${ingredients}</li>
                    `;
    }
    html += `</ul>`
    let tag= meal.strTags
    console.log(tag)
    if(tag)
    {
        tags = tag.split(",");
        if (tags.length > 0) {
        html += `
            <h3>Tags:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">`;
        
        tags.forEach(t => {
            html += `<li class="alert alert-danger m-2 p-1">${t}</li>`;
        });
        
        html += `</ul>`;
    } 
    }

                html += `
                            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                        </div></div>
                    </div>
                
                `;
    main.innerHTML = html;
}
function lessWords(w)
{
    let word = w.split(' ');
    let text = word.slice(0 , 25);
    return text.join(" ");
}
function showContacts(){
    main.innerHTML =`
    <div class="container">
        <div class="row py-5 g-4 " id="rowData"><div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="isValid(${regex.nameRegex}, this,'name')" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="isValid(${regex.email}, this , 'email')" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *user@example.com
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="isValid(${regex.phonenumber}, this, 'phone')" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="isValid(${regex.age}, this , 'age')" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="passwordInput" name="password" onkeyup="isValid(${regex.password}, this , 'password')" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput" onkeyup="rePasswordValid(this)" type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
        </div> </div>
        </div>
        `
}
const regex= 
{
    nameRegex : /^[a-zA-Z\s]{3,50}$/,
    phonenumber : /^01[\d]{9}$/,
    age : /^\d{2}$/,
    email :/^[\w.-]+@[\w-]+\.[a-zA-Z]{2,}$/,
    password : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
}
const validationStatus = {
    name: false,
    phone: false,
    age: false,
    email: false,
    password: false,
    repassword: false
};

repasswordInput = document.getElementById('repasswordInput')
function rePasswordValid(r){
    passwordInput = document.getElementById('passwordInput')
    if (r.value === passwordInput.value && validationStatus.password)
    {
        r.nextElementSibling.classList.replace("d-block" , "d-none");
        validationStatus.repassword = true;
    }
    else
    {
        r.nextElementSibling.classList.replace("d-none" , "d-block")
        validationStatus.repassword = false;
    }
    checkSubmitButton();
}
function isValid(regex , input , filedname){
    if(regex.test(input.value))
    {
        input.nextElementSibling.classList.replace("d-block" , "d-none")
        validationStatus[filedname] = true;
    }
    else
    {
        input.nextElementSibling.classList.replace("d-none" , "d-block")
        validationStatus[filedname] = false;
    }
    checkSubmitButton()
}
function checkSubmitButton(){
    submitBtn = document.getElementById("submitBtn")
        const allValid = Object.values(validationStatus).every(status => status === true);
        submitBtn.disabled = !allValid;
}
