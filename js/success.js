
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
        resolve(id)
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
    let pet_json = {
        "id": id+1,
        "title": name,
        "type": pet,
        "img": img_data,
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

async function successful_give(e) {
    e.preventDefault();
    const pet_json = await get_parameters() // tutaj będzie dodawanie do Local Storage
    let animals = JSON.parse(localStorage.getItem('animals'))
    animals.push(pet_json)
    localStorage.setItem("animals", JSON.stringify(animals));
    location.href = "../pages/successful_give.html"
    return false;
}

function create_link() {
    // const id = id pliku
    const new_link = document.getElementById("new_link");
    new_link.href = "../pages/pet.html?id="`${length}`;
}

function successful_register(e) {
    e.preventDefault();
    const password1 = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const not_identical = document.getElementById("not_identical");
    if(password1.value !== password2.value) {
        not_identical.style.display = "block";
        password1.value = "";
        password2.value = "";
    } else {
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