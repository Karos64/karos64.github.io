
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
    load_default_animals()
}

const loc = window.location.pathname;
const menus = {
    "/pages/adopet.html":               0,
    "/pages/pet.html":                  0,
    "/pages/give.html":                 1,
    "/pages/donate.html":               2,
    "/pages/cooperation.html":          3,
    "/pages/register_shelter.html":     3,
    "/pages/contact.html":              4
}

function lightUpOption() {
    options = document.getElementsByClassName('header-button');
    chosenOne = document.getElementsByClassName('header-button')[menus[loc]];
    if(chosenOne === null || chosenOne === undefined) return;
    chosenOne.style.background = "#cdcdcd";
}

function load_default_animals() {
    // if animals already loaded
    if(localStorage.getItem("animals") != null) return;

    let fetches = []
    let animal_json = []

    // load all animal files
    for (let i = 1; i <= ANIMAL_COUNT; i++) {
        fetches.push(
            fetch(`../assets/animals/dog${i}.json`)
                .then((response) => response.json())
                .then((json) => {
                    animal_json.push({
                        'id': i,
                        'title': json['title'],
                        'img': `../imgs/dog${i}.jpg`,
                        'description': json['description'],
                        'gender': json['gender'],
                        'weight': json['weight'],
                        'age': json['age'], // this is outdated
                        'pedigree': json['pedigree'],
                        'breed': json['breed'],
                        'shelter': json['shelter'],
                        'tags': json['tags']
                    })
                })
        )
    }

    // wait for all of them to load
    Promise.all(fetches).then(() => {
        animals = JSON.stringify(animal_json)
        // save to local storage
        localStorage.setItem("animals", animals);
    })
}