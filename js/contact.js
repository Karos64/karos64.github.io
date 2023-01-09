function load_all_shelters() {
    let shelters = JSON.parse(localStorage.getItem('shelters'))
    let html_string_for_shelters_select = ""
    for (let shelter in shelters) {
        html_string_for_shelters_select += `
        <div class="shelter-info">
            <h3>${shelters[shelter]['name']}</h3>
            <p>ul. ${shelters[shelter]['street']} ${shelters[shelter]['street-nr']}</p>
            <p>${shelters[shelter]['zip-code']} ${shelters[shelter]['city']}</p>
            <p>email: ${shelters[shelter]['email']}</p>
        </div>`;
    }
    document.getElementById('shelter-contact').innerHTML = html_string_for_shelters_select;

}