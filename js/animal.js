const buildAnimalPanel = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')

    const animalInfo = document.getElementById('animal-info');
    const animalInfoTags = document.getElementById('animal-tags');
    const animalPhoto = document.getElementById('animal-photo');
    const animalName = document.getElementById('animal-name');
    const animalDesc = document.getElementById('animal-description');
    const animalTags = document.getElementById('tags');

    // if animals not loaded
    animals = localStorage.getItem("animals")
    if(animals === null) {
        location.href = "../index.html"
        return false;
    }
    animals = JSON.parse(animals)
    
    for(let i = 0; i < animals.length; i++) {
        if(animals[i]['id'] == id) {
            var pet = animals[i]
            break;
        }
    }

    if(pet === undefined) {
        location.href = "../index.html"
        return false;
    }

    let info = '';

    if(pet['owner'].toLowerCase() == "user") {
        document.getElementById('adoptdog-button').style.display = "none"

        info = `
            <p>Zwierzę:</p>
            <p>Płeć:</p>
            <p>Wiek:</p>
            <p>Rodowód:</p>
            <p>Miasto:</p>
            <p>Właściciel:</p>
            <p>Kontakt:</p>
        `
    } else {
        info = `
            <p>Zwierzę:</p>
            <p>Płeć:</p>
            <p>Wiek:</p>
            <p>Rodowód:</p>
            <p>Schronisko:</p>
        `
    }

    animalInfoTags.innerHTML = info;

    animalPhoto.src = pet['img']
    animalName.innerHTML = pet['title']

    typ_cast = {
        "pies": "pies",
        "kot": "kot",
        "papuga": "papuga",
        "chomik": "chomik",
        "swinka_morska": "świnka morska",
        "swinka": "świnka",
        "mysz": "myszka",
        "waz": "wąż"
    }

    if(pet['owner'].toLowerCase() == "user") {
        info = `
            <p>${typ_cast[pet['type']]}</p>
            <p>${pet['gender']}</p>
            <p>${pet['age']}</p>
            <p>${pet['pedigree']}</p>
            <p>${pet['city']}</p>
            <p>${pet['user']}</p>
            <p>${pet['email']}</p>
        `
    } else {
        info = `
            <p>${typ_cast[pet['type']]}</p>
            <p>${pet['gender']}</p>
            <p>${pet['age']}</p>
            <p>${pet['pedigree']}</p>
            <p>${pet['shelter']}</p>
        `
    }
    animalInfo.innerHTML = info

    let tags = ''
    for(let i = 0; i < pet['tags'].length; i++) {
        tags += `
            <div class="filter">${pet['tags'][i]}</div>
        `
    }

    animalTags.innerHTML = tags

    animalDesc.innerHTML = pet['description']

    let adoptBtn = document.getElementById("adoptdog-button")
    if(pet['active'] && !"shelter".localeCompare(pet['owner'])) {
        userData = localStorage.getItem("session")
        let found = false;
        if(userData != null) {
            userData = JSON.parse(userData)
            for(let i = 0; i < userData['data']['active'].length; i++) {
                if(userData['data']['active'][i] == id) {
                    found = true;
                    console.log("yikes")
                    break;
                }
            }
        }
        if(!found) adoptBtn.style.display = "flex";
    }
}
