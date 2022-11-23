function show_filters(){
    let request = new XMLHttpRequest();
    request.addEventListener("load", function(evt){
        console.log(evt);
    }, false);

    request.open('GET', '../components/filters_show.html', false)
    request.send(null);

    document.getElementById("filtr").innerHTML = request["responseText"];

}

function hide_filters(){
    let request = new XMLHttpRequest();
    request.addEventListener("load", function(evt){
        console.log(evt);
    }, false);

    request.open('GET', '../components/filters_hide.html', false)
    request.send(null);

    document.getElementById("filtr").innerHTML = request["responseText"];

}