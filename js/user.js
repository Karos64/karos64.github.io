function get_user_data() {
    let userData = localStorage.getItem('session');
    let animalsData = localStorage.getItem("animals")
    if(userData == null || animalsData == null) {
        window.location.href = 'adopt.html';
        return false;
    }

    userData = JSON.parse(userData)

    if(!"shelter".localeCompare(userData['type_of_user'])) {
        let dataDiv = document.getElementById("type_shelter")
        dataDiv.style.display = "block"

        let nameDiv = document.getElementById("shelter_name")
        let addressDiv = document.getElementById("shelter_address")
        let nipDiv = document.getElementById("shelter_nip")
        let regonDiv = document.getElementById("shelter_regon")
        let krsDiv = document.getElementById("shelter_krs")
        let bankDiv = document.getElementById("shelter_bank")
        let emailDiv = document.getElementById("shelter_email")

        nameDiv.innerHTML = userData['data']['name']
        addressDiv.innerHTML = userData['data']['street'] + " " + userData['data']['street-nr'] + ", " + userData['data']['zip-code'] + " " + userData['data']['city']
        nipDiv.innerHTML = userData['data']['NIP']
        regonDiv.innerHTML = userData['data']['REGON']
        krsDiv.innerHTML = userData['data']['KRS']
        bankDiv.innerHTML = userData['data']['bank']
        emailDiv.innerHTML = userData['data']['email']
    } else {
        let dataDiv = document.getElementById("type_user")
        dataDiv.style.display = "block"

        let nameDiv = document.getElementById("user_name")
        let birthdayDiv = document.getElementById("birthday")
        let addressDiv = document.getElementById("user_address")
        let emailDiv = document.getElementById("user_email")
        
        nameDiv.innerHTML = userData['data']['name'] + " " + userData['data']['surname']
        birthdayDiv.innerHTML = userData['data']['date']
        addressDiv.innerHTML = userData['data']['street'] + " " + userData['data']['street-nr'] + ", " + userData['data']['zip-code'] + " " + userData['data']['city']
        emailDiv.innerHTML = userData['data']['email']
    }

    // Generates list of adopted pets by user/shelter
    let adoptedDiv = document.getElementById("adopted")
    let adoptedByUser = userData['data']['adopted']
    animalsData = JSON.parse(animalsData)

    for(let i=0; i < animalsData.length; i++) {
        let animal = animalsData[i]
        for(let j=0; j < adoptedByUser.length; j++) {
            if(animal['id'] == adoptedByUser[j]) {
                adoptedDiv.innerHTML += `
                    <div class="animal">
                        <a href="pet.html?id=${animal['id']}" class="name">${animal['title']}</a>
                        <p class="date">${animal['adopted_at']}</p>
                    </div>
                `
            }
        }
    }

    // Generates list of pets added by user/shelter
    let givenPetsDiv = document.getElementById("animals")
    let activePets = userData['data']['active']
    let inactivePets = userData['data']['inactive']

    // ACTIVE
    for(let i=0; i < activePets.length; i++) {
        for(let j=0; j < animalsData.length; j++) {
            if(animalsData[j]['id'] == activePets[i]) {
                let animal = animalsData[j]
                givenPetsDiv.innerHTML += `
                    <div class="animal">
                        <a href="pet.html?id=${animal['id']}" class="name">${animal['title']}</a>
                        <p class="is_active">AKTYWNE</p>
                        <i class="icon gg-remove-r" title="Usuń ogłoszenie" onclick="removePet(${animal['id']})"></i>
                    </div>
                `
                break
            }
        }
    }

    // INACTIVE
    for(let i=0; i < inactivePets.length; i++) {
        for(let j=0; j < animalsData.length; j++) {
            if(animalsData[j]['id'] == inactivePets[i]) {
                if(animalsData[j]['adopted_at'].length != 0) continue;
                let animal = animalsData[j]
                givenPetsDiv.innerHTML += `
                    <div class="animal">
                        <a href="pet.html?id=${animal['id']}" class="name">${animal['title']}</a>
                        <p class="is_active">NIEAKTYWNE</p>
                        <i class="icon gg-add-r" title="Dodaj ponownie" onclick="addPet(${animal['id']})"></i>
                    </div>
                `
                break
            }
        }
    }

    // ADOPTED
    for(let i=0; i < inactivePets.length; i++) {
        for(let j=0; j < animalsData.length; j++) {
            if(animalsData[j]['id'] == inactivePets[i]) {
                if(animalsData[j]['adopted_at'].length == 0) continue;
                let animal = animalsData[j]
                givenPetsDiv.innerHTML += `
                    <div class="animal">
                        <a href="pet.html?id=${animal['id']}" class="name">${animal['title']}</a>
                        <p class="is_active">ADOPTOWANY</p>
                        <i class="icon gg-add-r" title="Anuluj adopcje" onclick="addPet(${animal['id']})"></i>
                    </div>
                `
                break
            }
        }
    }
}

function removePet(id) {
    let userData = localStorage.getItem('session');
    let allUsers = JSON.parse(localStorage.getItem('users'));
    let animalsData = JSON.parse(localStorage.getItem('animals'));
    let sheltersData = JSON.parse(localStorage.getItem('shelters'));

    userData = JSON.parse(userData)

    for(let i=0; i < animalsData.length; i++) {
        if(animalsData[i]['id'] == id) {
            animalsData[i]['active'] = false
            break
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

    for(let i = 0; i < userData['data']['active'].length; i++) {
        if(userData['data']['active'][i] == id) {
            userData['data']['active'].splice(i, 1);
            userData['data']['inactive'].push(id);
            found = true;
            break;
        }
    }

    localStorage.setItem('session', JSON.stringify(userData));
    localStorage.setItem('animals', JSON.stringify(animalsData));
    localStorage.setItem('shelters', JSON.stringify(sheltersData));
    localStorage.setItem('users', JSON.stringify(allUsers));
    location.href = "user.html"
}

function addPet(id) {
    let userData = localStorage.getItem('session');
    let allUsers = JSON.parse(localStorage.getItem('users'));
    let animalsData = JSON.parse(localStorage.getItem('animals'));
    let sheltersData = JSON.parse(localStorage.getItem('shelters'));

    userData = JSON.parse(userData)

    // set animal info
    for(let i=0; i < animalsData.length; i++) {
        if(animalsData[i]['id'] == id) {
            animalsData[i]['active'] = true
            animalsData[i]['adopted_at'] = ""
            break
        }
    }

    // set shelter or user info
    let found = false;
    for(let shelter of sheltersData) {
        for(let i = 0; i < shelter['inactive'].length; i++) {
            if(shelter['inactive'][i] == id) {
                shelter['inactive'].splice(i, 1);
                shelter['active'].push(id);
                found = true;
                break;
            }
        }
        if(found) break;
    }

    if(!found) {
        for(let user of allUsers) {
            for(let i = 0; i < user['inactive'].length; i++) {
                if(user['inactive'][i] == id) {
                    user['inactive'].splice(i, 1);
                    user['active'].push(id);
                    found = true;
                    break;
                }
            }
            if(found) break;
        }
    }

    // set session info
    for(let i = 0; i < userData['data']['inactive'].length; i++) {
        if(userData['data']['inactive'][i] == id) {
            userData['data']['inactive'].splice(i, 1);
            userData['data']['active'].push(id);
            break;
        }
    }

    // delete adopted flag if adopted
    found = false;
    for(let i = 0; i < allUsers.length; i++) {
        for(let j = 0; j < allUsers[i]['adopted'].length; j++) {
            if(allUsers[i]['adopted'][j] == id) {
                allUsers[i]['adopted'].splice(j, 1);
                found = true;
            }
        }
        if(found) break;
    }

    if(!found) {
        for(let i = 0; i < sheltersData.length; i++) {
            for(let j = 0; j < sheltersData[i]['adopted'].length; j++) {
                if(sheltersData[i]['adopted'][j] == id) {
                    sheltersData[i]['adopted'].splice(j, 1);
                    found = true;
                }
            }
            if(found) break;
        }
    }

    localStorage.setItem('session', JSON.stringify(userData));
    localStorage.setItem('animals', JSON.stringify(animalsData));
    localStorage.setItem('shelters', JSON.stringify(sheltersData));
    localStorage.setItem('users', JSON.stringify(allUsers));
    location.href = "user.html"
}