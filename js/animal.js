const buildAnimalPanel = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')

    const animalPhoto = document.getElementById('animal-photo');
    const animalName = document.getElementById('animal-name');
    const animalInfo = document.getElementById('animal-info');
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

    animalPhoto.src = pet['img']
    animalName.innerHTML = pet['title']

    let info = `
        <p>${pet['gender']}</p>
        <p>${pet['weight']} kg</p>
        <p>${pet['height']} cm</p>
        <p>${pet['age']}</p>
        <p>${pet['pedigree']}</p>
        <p>${pet['breed']}</p>
        <p>${pet['shelter']}</p>
    `
    animalInfo.innerHTML = info

    let tags = ''
    for(let i = 0; i < pet['tags'].length; i++) {
        tags += `
            <div class="filter">${pet['tags'][i]}</div>
        `
    }

    animalTags.innerHTML = tags

    animalDesc.innerHTML = pet['description']
}