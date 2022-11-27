// DO NOT USE THIS, THIS IS ONLY MY FUNCTIONS THAT I USED TO CREATE ALL ANIMAL JSON FILES
// These are here in case we need to redo animal json or sth
// So we can easily generate new json files
// These arent importet anywhere or used in any file (and shouldn't be)
// ~ Karosek

// returns random element of array, e.g. houses.random()
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const createFiles = () => {
    let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu ex mattis, viverra nunc vitae, vestibulum nunc. In eu augue et urna maximus auctor sed in sapien. Morbi commodo, justo non lobortis fringilla, lacus ex tristique dui, ac laoreet est ex vel nisi. Donec dapibus dictum sapien a pretium. Nulla quis tristique neque. Aenean in lorem nec lacus mollis maximus nec sit amet erat. Phasellus in suscipit lacus, non scelerisque dolor. Aliquam erat volutpat. Sed massa sapien, commodo scelerisque dapibus ac, imperdiet malesuada lacus. Morbi sollicitudin sem arcu, vestibulum porttitor felis accumsan ut. Etiam sodales sodales sapien sagittis vehicula. Integer aliquam risus et ante consectetur, et iaculis ante consectetur. Nullam aliquam dui id ipsum tincidunt semper."
    let names = [
        'Astro', 'Balto', 'Barney', 'Barry', 'Beethoven', 'Benji', 'Kieł', 'Boo', 'Boss', 'Bruiser', 'Chojrak',
        'Cywil', 'Droopy', 'Dżok', 'Eddie', 'Goofy', 'Fala', 'Happy', 'Hooch', 'Huckelberry', 'Kibic', 'Lampo',
        'Lassie', 'Łajka', 'Madison', 'Odie', 'Pankracy', 'Piorun', 'Pluto', 'Reksio', 'Ren', 'Rex', 'Rin Tin Tin',
        'Saba', 'Scooby Doo']
    let shelters = [
        'DogNoHome - Kwiatowa 25, 30-437 Kraków',
        'Get-A-Pet - Maślana 2, 72-122 Bydgoszcz',
        'YetAnotherShelter - Opolska 28, 30-437 Kraków',
        'DoggyHome - Szaflarska 99, 40-000 Katowice'
    ]
    let tags = [
        'Lubi spacery',
        'Szczepienia',
        'Uwielbia zabawę',
        'Źle znosi samotność',
        'Przyjazny dzieciom',
        'Szkolony',
        'Akceptuje inne zwierzęta'
    ]
    for (let i = 1; i <= 11; i++) {
        let jsondata = {
            'id': i,
            'title': names.pop(),
            'img': `../imgs/dog${i}.jpg`,
            'description': lorem,
            'gender': ['samiec', 'samica'].random(),
            'weight': getRandomInt(19, 26),
            'height': getRandomInt(48, 62),
            'age': getRandomInt(3, 9),
            'pedigree': ['tak', 'nie'].random(),
            'breed': 'mieszana',
            'shelter': shelters.random(),
            'tags': getMultipleRandom(tags, getRandomInt(2, 7))
        }
        download(JSON.stringify(jsondata), `dog${i}.json`, 'text/json');
    }
}
