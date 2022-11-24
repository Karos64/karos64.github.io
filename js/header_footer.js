
function addCss(path){
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', path)

    document.getElementById("head").appendChild(style)
}

function add_header(){
    let request = new XMLHttpRequest();
    request.addEventListener("load", function(evt){
        //console.log(evt);
    }, false);

    request.open('GET', '../components/header.html', false)
    request.send(null);

    document.getElementById("body").insertAdjacentHTML( 'afterbegin', request["responseText"] );

    addCss('../css/header.css')
    addCss('https://css.gg/user.css')
}

function add_footer(){
    let request = new XMLHttpRequest();
    request.addEventListener("load", function(evt){
        //console.log(evt);
    }, false);

    request.open('GET', '../components/footer.html', false)
    request.send(null);

    document.getElementById("body").insertAdjacentHTML( 'beforeend', request["responseText"] );

    addCss('../css/footer.css')
}

function build_template(){
    add_header()
    add_footer()
}

