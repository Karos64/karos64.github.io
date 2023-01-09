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

    let userData = localStorage.getItem('session');
    if(userData == null) {
        window.location.href = 'give_not_logged.html';
        return false;
    }

    const pet_json = await get_parameters()
    add_elem_to_localStorage('animals', pet_json)
    location.href = "../pages/successful_give.html"
}

function create_link() {
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
        if (name) {
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
            shelter_to_add['email'] = email
            shelter_to_add['password'] = password1
            shelters[shelters.length - 1] = shelter_to_add
            localStorage.setItem('shelters', JSON.stringify(shelters))
        }

        location.href = "../pages/successful_register.html"
    }
    return false;
}

function successful_adoption(e) {
    e.preventDefault();

    const wrong = document.getElementById("wrong");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let json = get_user_from_localStorage(email.value, password.value)
    if (json) {
        localStorage.setItem('session', JSON.stringify(json))

        let userData = localStorage.getItem('session');
        let allUsers = JSON.parse(localStorage.getItem('users'));
        let animalsData = JSON.parse(localStorage.getItem('animals'));
        let sheltersData = JSON.parse(localStorage.getItem('shelters'));
        const urlParams = new URLSearchParams(window.location.search);
        const id = Number(urlParams.get('id'));

        if(id == null) {
            window.location.href = 'adopet.html';
            return false;
        }

        let user = JSON.parse(userData);
        let animal = animalsData[id-1];
    
        animal['active'] = false;
        user['data']['adopted'].push(id);
    
        for(let i = 0; i < allUsers.length; i++) {
            if(allUsers[i]['id'] == user['data']['id']) {
                allUsers[i]['adopted'].push(id);
                break;
            }
        }
    
        for(let shelter of sheltersData) {
            let found = false;
            for(let i = 0; i < shelter['active'].length; i++) {
                if(shelter['active'][i] == id) {
                    shelter['active'].splice(i, 1);
                    shelter['inactive'].push(id);
                    found = true;
                    break;
                }
            }
            if(found) break;
        }
    
        localStorage.setItem('session', JSON.stringify(user));
        localStorage.setItem('animals', JSON.stringify(animalsData));
        localStorage.setItem('shelters', JSON.stringify(sheltersData));
        localStorage.setItem('users', JSON.stringify(allUsers));
        location.href = 'successful_adoption.html';
    } else {
        wrong.style.display = "block";
        email.value = "";
        password.value = "";
    }

    return false;
}

async function successful_login_give(e) {
    e.preventDefault();

    const wrong = document.getElementById("wrong");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let json = get_user_from_localStorage(email.value, password.value)
    if (json) {
        localStorage.setItem('session', JSON.stringify(json))
        location.href = "../pages/give.html"
    } else {
        wrong.style.display = "block";
        email.value = "";
        password.value = "";
    }

    return false;
}

async function back_to_login(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    let password1 = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    const not_identical = document.getElementById("not_identical");

    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));

    if(id == null) {
        window.location.href = 'adopet.html';
        return false;
    }

    if(password1 !== password2) {
        not_identical.style.display = "block";
        password1 = "";
        password2 = "";
    } else {

        let name = document.getElementById("name");
        if (name) {
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
            shelter_to_add['email'] = email
            shelter_to_add['password'] = password1
            shelters[shelters.length - 1] = shelter_to_add
            localStorage.setItem('shelters', JSON.stringify(shelters))
        }

        location.href = "../pages/login_adopt.html?id=" + id
    }
    return false;
}

async function back_to_login_give(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    let password1 = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    const not_identical = document.getElementById("not_identical");

    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));

    if(id == null) {
        window.location.href = 'adopet.html';
        return false;
    }

    if(password1 !== password2) {
        not_identical.style.display = "block";
        password1 = "";
        password2 = "";
    } else {

        let name = document.getElementById("name");
        if (name) {
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
            shelter_to_add['email'] = email
            shelter_to_add['password'] = password1
            shelters[shelters.length - 1] = shelter_to_add
            localStorage.setItem('shelters', JSON.stringify(shelters))
        }

        location.href = "../pages/give_not_logged.html"
    }
    return false;
}

function successful_donation(e) {
    e.preventDefault();
    location.href = "../pages/payment_page.html"
    return false;
}

function successful_contact(e){
    e.preventDefault();
    location.href = "../pages/successful_contact.html"
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
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let json = get_user_from_localStorage(email.value, password.value)
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
        "bank": "" + bank, // this has to be string, does it work tho?
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