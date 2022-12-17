
function get_parameters(){
    const name = document.getElementById('name').value
    const pet = document.getElementById('pet').value
    const gender = document.getElementById('gender').value
    const age = document.getElementById('age').value
    const pedigree = document.getElementById('pedigree').value
    const description = document.getElementById('description').value
    let tags = []
    if (document.getElementById('spacery').checked){
        tags.push(document.getElementById('spacery').value)
    }
    if (document.getElementById('szczepienia').checked){
        tags.push(document.getElementById('szczepienia').value)
    }
    if (document.getElementById('zabawa').checked){
        tags.push(document.getElementById('zabawa').value)
    }
    if (document.getElementById('samotnosc').checked){
        tags.push(document.getElementById('samotnosc').value)
    }
    if (document.getElementById('przyjazny').checked){
        tags.push(document.getElementById('przyjazny').value)
    }
    if (document.getElementById('szkolony').checked){
        tags.push(document.getElementById('szkolony').value)
    }
    if (document.getElementById('akceptuje_zwierzeta').checked){
        tags.push(document.getElementById('akceptuje_zwierzeta').value)
    }

    let pet_json = {
        "id": 1, // musi zliczać ile plików już jest i +1
        "title": name,
        "typ": pet,
        "img": "../imgs/img1.jpg", // huh pewnie że mamy dodawnie pliku
        "description": description,
        "gender": gender,
        "age": age,
        "pedigree": pedigree,
        "owner": "", // to wszystko co jest "" jest zbierane z LocalStorage, kto to jest
        "shelter": "",
        "city": "",
        "user": "",
        "email": "",
        "number": "",
        "tags": tags
    }
    return pet_json
}

function successful_give(e) {
    e.preventDefault();
    const pet_json = get_parameters() // tutaj będzie dodawanie do Local Storage
    location.href = "../pages/successful_give.html"
    return false;
}

function successful_register(e) {
    e.preventDefault();
    location.href = "../pages/successful_register.html"
    return false;
}

function successful_adoption(e) { // tej użyj po zatwierdzeniu kalendarza jeśli użytkownik jest zalogowany
    e.preventDefault();

    const request = new XMLHttpRequest();
    request.open("GET", "../assets/users/user1.json", false); // zedytować po dodaniu bazy użytkowników
    request.send(null);

    const wrong = document.getElementById("wrong");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (request.status === 200) {
        const data = JSON.parse(request.response);
        if (email.value === data["email"] && password.value === data["password"]) {
            location.href = "../pages/successful_adoption.html"
        } else {
            wrong.style.display = "block";
            email.value = "";
            password.value = "";
        }
    }
    return false;
}

function successful_login_give(e) { // przekierowanie do "Oddaj" jeśli był niezalogowany
    e.preventDefault();

    const request = new XMLHttpRequest();
    request.open("GET", "../assets/users/user1.json", false); // zedytować po dodaniu bazy użytkowników
    request.send(null);

    const wrong = document.getElementById("wrong");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (request.status === 200) {
        const data = JSON.parse(request.response);
        if (email.value === data["email"] && password.value === data["password"]) {
            location.href = "../pages/give.html"
        } else {
            wrong.style.display = "block";
            email.value = "";
            password.value = "";
        }
    }
    return false;
}

function back_to_login(e) { // tej użyj po zatwierdzeniu kalendarza jeśli użytkownik jest niezalogowany
    e.preventDefault();
    location.href = "../pages/login_adopt.html"
    return false;
}

function back_to_login_give(e) {
    e.preventDefault();
    location.href = "../pages/give_not_logged.html"
    return false;
}

function successful_donation(e) {
    e.preventDefault();
    location.href = "../pages/successful_donation.html"
    return false;
}

function login(e) {
    e.preventDefault();

    const request = new XMLHttpRequest();
    request.open("GET", "../assets/users/user1.json", false); // zedytować po dodaniu bazy użytkowników
    request.send(null);

    const wrong = document.getElementById("wrong");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (request.status === 200) {
        const data = JSON.parse(request.response);
        if (email.value === data["email"] && password.value === data["password"]) {
            location.href = "../pages/adopet.html";
        } else {
            wrong.style.display = "block";
            email.value = "";
            password.value = "";
        }
    }
    return false;
}

function register_shelter(e) {
    e.preventDefault();
    location.href = "../pages/register_shelter.html"
    return false;
}

function manage_select(select) {
    if (select.selectedIndex == 0) {
        select.style.color = "gray";
    } else {
        select.style.color = "black";
    }
}