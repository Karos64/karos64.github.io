function randomize(array){
    return array[Math.floor(Math.random()*array.length)];
}

function create_data(){
    let animal_json = [
        {
            "id": 1,
            "title": "Łajka",
            "img": "../imgs/doggy.jpg",
        },
    ];

    let names = [
        'Astro', 'Balto', 'Barney', 'Barry', 'Beethoven', 'Benji', 'Kieł', 'Boo', 'Boss', 'Bruiser', 'Chojrak',
        'Cywil', 'Droopy', 'Dżok', 'Eddie', 'Goofy', 'Fala', 'Happy', 'Hooch', 'Huckelberry', 'Kibic', 'Lampo',
        'Lassie', 'Łajka', 'Madison', 'Odie', 'Pankracy', 'Piorun', 'Pluto', 'Reksio', 'Ren', 'Rex', 'Rin Tin Tin',
        'Saba', 'Scooby Doo']

    let img_array = []

    for(let i=1; i<=9; i++){
        // img_array.push(fs.readFileSync(path.join(__dirname + `/../img/dog${i}.jpg`)).toString('hex'))
        img_array.push(`../imgs/dog${i}.jpg`)
    }

    for(let i=2; i<20; i++){
        animal_json.push(
            {
                'id': i,
                'title': randomize(names),
                'img': randomize(img_array)
            }
        )
    }

    return animal_json
}

function createElement(elem){
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
        if (elem['title'].length > 23){
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

function wrap_data(data){

    return JSON.parse(JSON.stringify(data));
}


function build_content(){
    let parsed_data = wrap_data(create_data());

    for( let elem in parsed_data){
        createElement(parsed_data[elem]);
    }

}

