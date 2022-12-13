function successful_give(e) {
    e.preventDefault();
    location.href="../pages/successful_give.html"
    return false;
}

function successful_register(e) {
    e.preventDefault();
    location.href="../pages/successful_register.html"
    return false;
}

function successful_adoption(e) {
    e.preventDefault();
    location.href="../pages/successful_adoption.html"
    return false;
}

function successful_donation(e) {
    e.preventDefault();
    location.href="../pages/successful_donation.html"
    return false;
}

function login(e) {
    e.preventDefault();
    location.href="../pages/adopet.html"
    return false;
}

function register_shelter(e) {
    e.preventDefault();
    location.href="../pages/register_shelter.html"
    return false;
}

function manage_select(select) {
    if(select.selectedIndex == 0) {
        select.style.color = "gray";
    } else {
        select.style.color = "black";
    }
}