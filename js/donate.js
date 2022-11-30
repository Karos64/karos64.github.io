// $(document).ready(function () {

//     // Radio button
    // $('.radio-group .radio').click(function () {
    //     $(this).parent().find('.radio').removeClass('selected');
    //     $(this).addClass('selected');
    // });

// })

// function to change .radio class to selected when clicked
function changeRadio() {
    var radio = document.getElementsByClassName("radio-group");
    for (var i = 0; i < radio.length; i++) {
        radio[i].onclick = function () {
            var selected = document.getElementsByClassName("selected");
            selected[0].className = selected[0].className.replace(" selected", "");
            this.className += " selected";
        }
    }
}