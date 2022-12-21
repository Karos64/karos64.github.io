
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

    if(localStorage.getItem("session") != null) {
        request.open('GET', '../components/header_logged.html', false)
    } else {
        request.open('GET', '../components/header.html', false)
    }
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
    load_default_users()
    load_default_shelters()
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
    let options = document.getElementsByClassName('header-button');
    let chosenOne = document.getElementsByClassName('header-button')[menus[loc]];
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
                        'type': json['typ'],
                        'img': `../imgs/animals/dogs/dog${i}.jpg`,
                        'description': json['description'],
                        'gender': json['gender'],
                        'age': json['age'],
                        'pedigree': json['pedigree'],
                        'owner': json['owner'],
                        'shelter': json['shelter'],
                        'city': json['city'],
                        'user': json['user'],
                        'email': json['email'],
                        'number': json['number'],
                        'tags': json['tags'],
                        'active': json['active'],
                    })
                })
        )
    }

    // wait for all of them to load
    Promise.all(fetches).then(() => {
        let animals = JSON.stringify(animal_json)
        // save to local storage
        localStorage.setItem("animals", animals);
    })
}

function load_default_users() {
    // if animals already loaded
    if(localStorage.getItem("users") != null) return;

    let fetches = []
    let user_json = []
    let USER_COUNT = 3
    // load all animal files
    for (let i = 1; i <= USER_COUNT; i++) {
        fetches.push(
            fetch(`../assets/users/user${i}.json`)
                .then((response) => response.json())
                .then((json) => {
                    user_json.push({
                        "id": i,
                        "name": json['name'],
                        "surname": json['surname'],
                        "date": json['date'],
                        "street": json['street'],
                        "street-nr": json['street-nr'],
                        "zip-code": json['zip-code'],
                        "city": json['city'],
                        "email": json['email'],
                        "password": json['password'],
                        "active": json['active'],
                        "inactive": json['inactive'],
                        "adopted": json['adopted']
                    })
                })
        )
    }

    // wait for all of them to load
    Promise.all(fetches).then(() => {
        let users = JSON.stringify(user_json)
        // save to local storage
        localStorage.setItem("users", users);
    })
}

function load_default_shelters() {
    // if animals already loaded
    if(localStorage.getItem("shelters") != null) return;

    let fetches = []
    let shelters_json = []
    let SHELTERS_COUNT = 5
    // load all animal files
    for (let i = 1; i <= SHELTERS_COUNT; i++) {
        fetches.push(
            fetch(`../assets/shelters/shelter${i}.json`)
                .then((response) => response.json())
                .then((json) => {
                    shelters_json.push({
                        "id": i,
                        "name": json['name'],
                        "street": json['street'],
                        "street-nr": json['street-nr'],
                        "zip-code": json['zip-code'],
                        "city": json['city'],
                        "NIP": json['NIP'],
                        "REGON": json['REGON'],
                        "KRS": json['KRS'],
                        "bank": json['bank'],
                        "email": json['email'],
                        "password": json['password'],
                        "active": json['active'],
                        "inactive": json['inactive'],
                        "adopted": json['adopted']
                    })
                })
        )
    }

    // wait for all of them to load
    Promise.all(fetches).then(() => {
        let shelters = JSON.stringify(shelters_json)
        // save to local storage
        localStorage.setItem("shelters", shelters);
    })
}