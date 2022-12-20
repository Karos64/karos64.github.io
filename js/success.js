
async function get_last_id(json){
    return new Promise((resolve, reject) => {
        let max = 0
        let id;
        for (let obj in json) {
            if (json[obj])
                id = json[obj]['id']
            if (id && id > max) {
                max = id
            }
        }

        resolve(max)
    })

}

async function saveImageToLocalStorage(inputId){

    return new Promise((resolve, reject) => {
        // Get the input element with the specified id
        let inputElement = document.getElementById(inputId);

        // Get the file that was selected by the user
        let file = inputElement.files[0];
        let dataURL;
        // Check if the file is an image
        if (file.type.match(/image.*/)) {
            // Create a new FileReader object
            let reader = new FileReader();

            // Set the onload function to run when the file has finished loading
            reader.onload = function () {
                // Get the data URL of the image
                dataURL = reader.result;
                // pet_json['img'] = "asdas"
                resolve(dataURL)
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    })
}

function update_user_json_in_localStorage(id, new_json, type){
    let users = JSON.parse(localStorage.getItem(type))
    let json_user;
    let user = 0
    for (user; user<users.length; user++){
        json_user = users[user]
        if (json_user['id'] === id) break
    }
    users[user] = new_json
    console.log()
    localStorage.setItem(type, JSON.stringify(users))
}

async function get_parameters(){
    const name = document.getElementById('name').value
    const pet = document.getElementById('pet').value
    const gender = document.getElementById('gender').value
    const age = document.getElementById('age').value
    const pedigree = document.getElementById('pedigree').value
    const description = document.getElementById('description').value
    const tag_names = ['spacery', 'szczepienia', 'zabawa', 'samotnosc', 'przyjazny', 'szkolony', 'akceptuje_zwierzeta']
    let tags = []

    for (let i in tag_names){
        if (document.getElementById(tag_names[i]).checked){
            tags.push(document.getElementById(tag_names[i]).value)
        }
    }
    let animals = JSON.parse(localStorage.getItem('animals'))
    const id = await get_last_id(animals)
    const img_data = await saveImageToLocalStorage('file_button')

    let user_json = JSON.parse(localStorage.getItem('session'))
    let pet_json = {
        "id": id+1,
        "title": name,
        "type": pet,
        "img": img_data,
        "description": description,
        "gender": gender,
        "age": age,
        "pedigree": pedigree,
        "owner": user_json['type_of_user'],
        "shelter": "",
        "city": user_json['data']['city'],
        "user": "",
        "email": user_json['data']['email'],
        "tags": tags
    }

    if (user_json['type_of_user'] === 'shelter'){
        pet_json['shelter'] = "" + user_json['data']['name'] + " - " + user_json['data']['street'] + " " + user_json['data']['street-nr'] + ", " + user_json['data']['zip-code'] + " " + user_json['data']['city']
    } else {
        pet_json['user'] = "" + user_json['data']['name'] + user_json['data']['surname']
    }

    user_json['data']['active'].push(id+1)

    update_user_json_in_localStorage(user_json['data']['id'], user_json['data'], "" + user_json['type_of_user'] + "s")
    localStorage.setItem('session', JSON.stringify(user_json))

    return pet_json
}

function add_elem_to_localStorage(collection, json_item){
    let json_collection = JSON.parse(localStorage.getItem(collection))
    json_collection.push(json_item)
    localStorage.setItem(collection, JSON.stringify(json_collection));
}

async function successful_give(e) {
    e.preventDefault();
    const pet_json = await get_parameters()
    add_elem_to_localStorage('animals', pet_json)
    // location.href = "../pages/successful_give.html"
    return false;
}

function create_link() {
    // const id = id pliku
    const new_link = document.getElementById("new_link");
    let animals = JSON.parse(localStorage.getItem('animals'))
    new_link.href = `../pages/pet.html?id=${animals[animals.length - 1]['id']}`;
}

async function successful_register(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    let password1 = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    const not_identical = document.getElementById("not_identical");
    if(password1 !== password2) {
        not_identical.style.display = "block";
        password1 = "";
        password2 = "";
    } else {

        let name = document.getElementById("name");
        if (name) { // tutaj dodawanie usera po przekierowaniu z register_user.html
            name = name.value
            const surname = document.getElementById("surname").value;
            const date = document.getElementById("date").value;
            const street = document.getElementById("street").value;
            const street_nr = document.getElementById("street-nr").value;
            const zip_code = document.getElementById("zip-code").value;
            const city = document.getElementById("city").value;

            let users = JSON.parse(localStorage.getItem('users'))
            let id = await get_last_id(users)

            let user_json = {
                "id": id+1,
                "name": name,
                "surname": surname,
                "date": date,
                "street": street,
                "street-nr": street_nr,
                "zip-code": zip_code,
                "city": city,
                "email": email,
                "password": password1,
                "active": [],
                "inactive": [],
                "adopted": []
            }

            add_elem_to_localStorage('users', user_json)

        } else { // tutaj dodawanie sheltera po przekierowaniu z cooperation.html
            let shelters = JSON.parse(localStorage.getItem('shelters'))
            let shelter_to_add = shelters[shelters.length - 1]
            console.log(shelter_to_add)
            shelter_to_add['email'] = email
            shelter_to_add['password'] = password1
            console.log(shelter_to_add)
            shelters[shelters.length - 1] = shelter_to_add
            console.log(shelters)
            console.log(JSON.stringify(shelters))
            localStorage.setItem('shelters', JSON.stringify(shelters))
        }

        location.href = "../pages/successful_register.html"
    }
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
    const password1 = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const not_identical = document.getElementById("not_identical");
    if(password1.value !== password2.value) {
        not_identical.style.display = "block";
        password1.value = "";
        password2.value = "";
    } else {
        location.href = "../pages/login_adopt.html"
    }
    return false;
}

function back_to_login_give(e) {
    e.preventDefault();
    const password1 = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const not_identical = document.getElementById("not_identical");
    if(password1.value !== password2.value) {
        not_identical.style.display = "block";
        password1.value = "";
        password2.value = "";
    } else {
        location.href = "../pages/give_not_logged.html"
    }
    return false;
}

function successful_donation(e) {
    e.preventDefault();
    location.href = "../pages/payment_page.html"
    return false;
}

function get_user_from_localStorage(email, password){
    let users = JSON.parse(localStorage.getItem('users'))
    let shelters = JSON.parse(localStorage.getItem('shelters'))
    let return_json = {
        "type_of_user" : "",
        "data" : {}
    }
    for (let user in users){
        if (email === users[user]['email'] && password === users[user]['password']) {
            return_json['type_of_user'] = "user"
            return_json['data'] = users[user]
            return return_json
        }
    }

    for (let shelter in shelters){
        if (email === shelters[shelter]['email'] && password === shelters[shelter]['password']) {
            return_json['type_of_user'] = "shelter"
            return_json['data'] = shelters[shelter]
            return return_json
        }
    }

    return null
}

function login(e) {
    e.preventDefault();

    const wrong = document.getElementById("wrong");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let json = get_user_from_localStorage(email, password)
    if (json) {
        localStorage.setItem('session', JSON.stringify(json))
        location.href = "../pages/adopet.html";
    } else {
        wrong.style.display = "block";
        email.value = "";
        password.value = "";
    }

    return false;
}

async function register_shelter(e) {
    e.preventDefault();
    const name = document.getElementById('name').value
    const street = document.getElementById('street').value
    const street_nr = document.getElementById('street-nr').value
    const zip_code = document.getElementById('zip-code').value
    const city = document.getElementById('city').value
    const nip = document.getElementById('nip').value
    const regon = document.getElementById('regon').value
    const krs = document.getElementById('krs').value
    const bank = document.getElementById('bank').value

    let id = await get_last_id(JSON.parse(localStorage.getItem('animals')))

    let shelter_json = {
        "id": id+1,
        "name": name,
        "street": street,
        "street-nr": street_nr,
        "zip-code": zip_code,
        "city": city,
        "NIP": nip,
        "REGON": regon,
        "KRS": krs,
        "bank": bank,
        "email": "",
        "password": "",
        "active": [],
        "inactive": [],
        "adopted": []
    }
    add_elem_to_localStorage('shelters', shelter_json)
    location.href = "../pages/register_shelter.html"
    return false;
}

function manage_select(select) {
    if (select.selectedIndex === 0) {
        select.style.color = "gray";
    } else {
        select.style.color = "black";
    }
}