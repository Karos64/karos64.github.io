function randomize(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// how many animals does we have in assets/animals
const ANIMAL_COUNT = 11

function createElement(elem) {
    let wrap_main = document.querySelector('#main_blocks');

    if (wrap_main != null) {
        let a_elem = document.createElement("a");
        a_elem.href = "./pet.html?id=" + elem['id'];

        let quiz_block = document.createElement("div");
        quiz_block.classList.add('quiz-block');

        let image_box = document.createElement("div");
        image_box.classList.add("image-box")

        let image = document.createElement("img");
        image.classList.add("image");
        image.src = elem['img'];

        let description = document.createElement("span");
        description.classList.add("description");
        if (elem['title'].length > 23) {
            elem['title'] = elem['title'].substring(0, 20) + "...";

        }
        description.innerHTML = elem['title'];

        image_box.appendChild(image);
        quiz_block.appendChild(image_box);
        quiz_block.appendChild(description);
        a_elem.appendChild(quiz_block);

        wrap_main.appendChild(a_elem);
    } else {
        console.log("Can't find #main_blocks");
    }


}

const build_content = () => {
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
                        'img': `../imgs/dog${i}.jpg`
                    })
                })
        )
    }

    // wait for all of them to load
    Promise.all(fetches).then(() => {
        let parsed_data = JSON.parse(JSON.stringify(animal_json))
        for (let elem in parsed_data) {
            createElement(parsed_data[elem]);
        }
    })
}

