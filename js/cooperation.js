function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const formName = document.getElementById('name');
const formStreet = document.getElementById('street');
const formStreetNr = document.getElementById('street-nr');
const formZipCode = document.getElementById('zip-code');
const formCity = document.getElementById('city');
const formNip = document.getElementById('nip');
const formRegon = document.getElementById('regon');
const formKrs = document.getElementById('krs');
const formBank = document.getElementById('bank');


// save to cookies everytime user inputs something
// maybe someone can do this better way?
formName.addEventListener('input', () => 
    setCookie('formName', formName.value, 1));

formStreet.addEventListener('input', () => 
    setCookie('formStreet', formStreet.value, 1));

formStreetNr.addEventListener('input', () => 
    setCookie('formStreetNr', formStreetNr.value, 1));

formZipCode.addEventListener('input', () => 
    setCookie('formZipCode', formZipCode.value, 1));

formCity.addEventListener('input', () => 
    setCookie('formCity', formCity.value, 1));

formNip.addEventListener('input', () => 
    setCookie('formNip', formNip.value, 1));

formRegon.addEventListener('input', () => 
    setCookie('formRegon', formRegon.value, 1));

formKrs.addEventListener('input', () => 
    setCookie('formKrs', formKrs.value, 1));

formBank.addEventListener('input', () => 
    setCookie('formBank', formBank.value, 1));


// load to form if cookie exists
document.addEventListener('DOMContentLoaded', () => {
    formName.value = getCookie('formName')
    formStreet.value = getCookie('formStreet')
    formStreetNr.value = getCookie('formStreetNr')
    formZipCode.value = getCookie('formZipCode')
    formCity.value = getCookie('formCity')
    formNip.value = getCookie('formNip')
    formRegon.value = getCookie('formRegon')
    formKrs.value = getCookie('formKrs')
    formBank.value = getCookie('formBank')
});