function create_localizations() {
    let localizations = {}
    let users = JSON.parse(localStorage.getItem('users'))
    let shelters = JSON.parse(localStorage.getItem('shelters'))

    for (let user in users){
        let city = users[user]['city']
        if (users[user]['active'].length !== 0) {
            if (city in localizations){
                if (!'Osoba prywatna' in localizations[city]){
                    localizations[city].push('Osoba prywatna')
                }
            } else {
                localizations[city] = ['Osoba prywatna']
            }
        }
    }
    for (let shelter in shelters){
        let city = shelters[shelter]['city']
        let shelter_name = "" + shelters[shelter]['name'] + " - " + shelters[shelter]['street'] + " " + shelters[shelter]['street-nr'] + ", " + shelters[shelter]['zip-code'] + " " + shelters[shelter]['city']
        if (shelters[shelter]['active'].length !== 0){
            if (city in localizations){
                localizations[city].push(shelter_name)
            } else {
                localizations[city] = [shelter_name]
            }
        }

    }
    return localizations

}

function load_all_shelters(){
    let html_string_for_shelters_select = "" + `<option value="" selected>Wybierz konkretne schronisko</option>`
    let first_private = true
    const localizations = create_localizations()
    for (let key in Object.keys(localizations)){
        let city = Object.keys(localizations)[key]
        localizations[city].forEach(element => {
            if (element === 'Osoba prywatna') {
                if (first_private) {
                    html_string_for_shelters_select += `<option value="${element}">${element}</option>`;
                    first_private = false
                }
            } else {
                html_string_for_shelters_select += `<option value="${element}">${element}</option>`;
            }
        });
    }
    document.getElementById('schronisko').innerHTML = html_string_for_shelters_select
}

function show_filters() {
    let request = new XMLHttpRequest();
    request.addEventListener("load", function (evt) {
        //console.log(evt);
    }, false);

    request.open('GET', '../components/filters_show.html', false)
    request.send(null);

    document.getElementById("filtr").innerHTML = request["responseText"];
    const localizations = create_localizations()
    document.getElementById('miasto').innerHTML = create_options(Object.keys(localizations), 'miasto')
    load_all_shelters()
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

function create_options(list, text){
    let string = "";
    string += `<option value="" selected>Wybierz ${text}</option>`
    list.forEach(element => {
        string += `<option value="${element}">${element}</option>`;

    });
    return string;
}

function switch_shelters(){

    const city = document.getElementById('miasto').options
    const city_selected_value = city[city.selectedIndex].value
    const localizations = create_localizations()
    if (city_selected_value === "") {
        load_all_shelters()

    } else {
        document.getElementById('schronisko').innerHTML = create_options(localizations[city_selected_value], 'konkretne schronisko')

    }
}
