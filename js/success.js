function successful_give(e) {
    e.preventDefault();
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
    location.href = "../pages/payment_page.html"
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