$(document).ready(function () {

    $('.radio-group .radio').click(function () {
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

})

function create_localizations() {
    let localizations = {}
    let shelters = JSON.parse(localStorage.getItem('shelters'))

    for (let shelter in shelters) {
        let city = shelters[shelter]['city']
        let shelter_name = "" + shelters[shelter]['name'] + " - " + shelters[shelter]['street'] + " " + shelters[shelter]['street-nr'] + ", " + shelters[shelter]['zip-code'] + " " + shelters[shelter]['city']
        if (shelters[shelter]['active'].length !== 0) {
            if (city in localizations) {
                localizations[city].push(shelter_name)
            } else {
                localizations[city] = [shelter_name]
            }
        }

    }
    return localizations

}

function load_all_shelters() {
    let html_string_for_shelters_select = "" + `<option value="" disabled hidden selected>Wybierz schronisko</option>`
    const localizations = create_localizations()
    for (let key in Object.keys(localizations)) {
        let city = Object.keys(localizations)[key]
        localizations[city].forEach(element => {
            html_string_for_shelters_select += `<option value="${element}">${element}</option>`;
        });
    }
    document.getElementById('schronisko').innerHTML = html_string_for_shelters_select
}
