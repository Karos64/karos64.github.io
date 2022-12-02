function show_filters() {
    let request = new XMLHttpRequest();
    request.addEventListener("load", function (evt) {
        //console.log(evt);
    }, false);

    request.open('GET', '../components/filters_show.html', false)
    request.send(null);

    document.getElementById("filtr").innerHTML = request["responseText"];

    document.getElementById('miasto').innerHTML = create_options(Object.keys(localizations), 'miasto')
}

function hide_filters() {
    let request = new XMLHttpRequest();
    request.addEventListener("load", function (evt) {
        //console.log(evt);
    }, false);

    request.open('GET', '../components/filters_hide.html', false)
    request.send(null);

    document.getElementById("filtr").innerHTML = request["responseText"];

}

const localizations = {
    'Kraków': ['DogNoHome - Kwiatowa 25, 30-437 Kraków', 'YetAnotherShelter - Opolska 28, 30-437 Kraków'],
    'Wadowice': ['Schronisko Psia Łapa - Długa 75, 34-123 Wadowice'],
    'Bydgoszcz': ['Get-A-Pet - Maślana 2, 72-122 Bydgoszcz'],
    'Katowice': ['DoggyHome - Szaflarska 99, 40-000 Katowice']
}

function create_options(list, text){
    let string = "";
    let index = 0;
    string += `<option value="" selected>Wybierz ${text}...</option>`
    list.forEach(element => {
        string += `<option value="${element}">${element}</option>`;

    });
    return string;
}

function switch_shelters(){

    const city = document.getElementById('miasto').options
    const city_selected_value = city[city.selectedIndex].value


    if (city_selected_value == "" || Object.keys(localizations[city_selected_value]).length == 0){
        document.getElementById('schronisko').setAttribute('disabled', '')
        return
    } else {
        document.getElementById('schronisko').removeAttribute('disabled')
    }

    document.getElementById('schronisko').innerHTML = create_options(localizations[city_selected_value], 'konkretne schronisko')
}
