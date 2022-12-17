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
    location.href = "../pages/successful_adoption.html"
    return false;
}

function back_to_login(e) { // tej użyj po zatwierdzeniu kalendarza jeśli użytkownik jest niezalogowany
    e.preventDefault();
    location.href = "../pages/login_adopt.html"
    return false;
}

function successful_donation(e) {
    e.preventDefault();
    location.href = "../pages/payment_page.html"
    return false;
}

function login(e) {
    e.preventDefault();
    location.href = "../pages/adopet.html"
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