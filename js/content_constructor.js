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
    // if animals not loaded
    if(localStorage.getItem("animals") === null) return;

    let animal_json = JSON.parse(localStorage.getItem("animals"))

    let parsed_data = JSON.parse(JSON.stringify(animal_json))
    document.querySelector('#main_blocks').innerHTML = ""
    for (let elem in parsed_data) {
        if (check_if_meets_requirements(parsed_data[elem])){
            createElement(parsed_data[elem]);
        }
    }
}

function get_option_value(id){
    const wrapper = document.getElementById(id)
    if (wrapper == undefined) return undefined;

    const wrapper_options = document.getElementById(id).options
    return wrapper_options[wrapper_options.selectedIndex].value
}

function check_if_meets_requirements(parsed_elem){
    let search_text = document.getElementById('search_input_text').value
    if (search_text !== "") {
        if (parsed_elem['title'].toLowerCase().includes(search_text.toLowerCase()) === false) return false;
    }

    if (get_option_value('plec') === undefined) return true;

    if (get_option_value('miasto') !== "") {
        if (parsed_elem['shelter'].includes(get_option_value('miasto')) === false) return false;
    }
    if(get_option_value('schronisko') !== ""){
        if (parsed_elem['shelter'] !== get_option_value('schronisko')) return false;
    }
    if(get_option_value('typ') !== ""){
        if (parsed_elem['typ'] !== get_option_value('typ')) return false;
    }
    if (get_option_value('plec') !== ""){
        if (parsed_elem['gender'] !== get_option_value('plec')) return false;
    }
    if (get_option_value('wiek') !== "") {
        let parsed_age = parseInt(parsed_elem['age'].split(" ")[0])
        let option_range_1 = parseInt(get_option_value('wiek').split("-")[0])
        let option_range_2 = parseInt(get_option_value('wiek').split("-")[1])
        if (parsed_age < option_range_1 || parsed_age > option_range_2) return false;
    }
    if (get_option_value('rodowod') !== "") {
        if (parsed_elem['pedigree'] !== get_option_value('rodowod')) return false;
    }

    let tags = document.getElementsByClassName('checkbox')
    let parsed_tags = parsed_elem['tags']

    for (let tag of tags){
        if (tag.checked){
            if (parsed_tags.includes(tag.value) == false) return false;
        }
    }


    return true;

}