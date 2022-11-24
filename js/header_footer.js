
function addCss(path){
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', path)

    document.getElementById("head").appendChild(style)
}

function add_header(){
    let request = new XMLHttpRequest();
    request.addEventListener("load", function(evt){
        //console.log(evt);
    }, false);

    request.open('GET', '../components/header.html', false)
    request.send(null);

    document.getElementById("body").insertAdjacentHTML( 'afterbegin', request["responseText"] );

    addCss('../css/header.css')
    addCss('https://css.gg/user.css')
}

function add_footer(){
    let request = new XMLHttpRequest();
    request.addEventListener("load", function(evt){
        //console.log(evt);
    }, false);

    request.open('GET', '../components/footer.html', false)
    request.send(null);

    document.getElementById("body").insertAdjacentHTML( 'beforeend', request["responseText"] );

    addCss('../css/footer.css')
}

function build_template(){
    add_header()
    add_footer()
    lightUpOption()
}

const loc = window.location.pathname;
const menus = {
    "/pages/adopet.html":        0,
    "/pages/pet.html":           0,
    "/pages/give.html":          1,
    "/pages/donate.html":        2,
    "/pages/cooperation.html":   3,
    "/pages/register_shelter.html": 3,
    "/pages/contact.html":       4
}

function lightUpOption() {
    options = document.getElementsByClassName('header-button');
    chosenOne = document.getElementsByClassName('header-button')[menus[loc]];
    if(chosenOne === null || chosenOne === undefined) return;
    chosenOne.style.background = "#cdcdcd";
}