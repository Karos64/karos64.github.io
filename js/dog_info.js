const date = new Date()

const today = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()

const MAX_MONTHS = 3;

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

let displayedMonth = month;
let displayedYear = year;

let pickedDay = 0;

function changeDay(allDays, day, el) {
    if(day < today && displayedMonth == month && displayedYear == year) return false;
    for(let i = 0; i < allDays.length; i++) {
        allDays[i].classList.remove('active')
    }
    el.classList.add('active')
    pickedDay = day;
}

function changeMonth(direction) {
    if(direction == 0) {
        if(displayedMonth == month && displayedYear == year) return; // if month is current month, do nothing
        if(displayedMonth == 1) {
            displayedMonth = 12;
            displayedYear--;
        } else {
            displayedMonth--;
        }
    } else {
        // block display of calendar to three months ahead
        let a = displayedMonth;
        let b = month;
        if(displayedYear == year+1) a += 12;
        if(a-b >= MAX_MONTHS) return;

        if(displayedMonth == 12) {
            displayedMonth = 1;
            displayedYear++;
        } else {
            displayedMonth++;
        }
    }
    showCalendar()
}

const months = [
    "styczeń", "luty", "marzec", "kwiecień", "maj",
    "czerwiec", "lipiec", "sierpień", "wrzesień",
    "październik", "listopad", "grudzień"
]

const showCalendar = () => {
    let startDay = new Date(displayedYear, displayedMonth-1, 1).getDay()

    dayslist = ''
    if(startDay == 0) startDay = 7;
    for (let index = 1; index < startDay; index++) {
        dayslist += `<div class="blankday"></div>`
        
    }
    for (let index = 1; index <= daysInMonth(displayedMonth, displayedYear); index++) {
        if(index == today && displayedMonth == month && displayedYear == year) {
            dayslist += '<div class="day active">' + index + '</div>'
            pickedDay = index;
            continue
        }
        dayslist += '<div class="day">' + index + '</div>'
    }

    el = document.getElementById('doginfo');

    el.innerHTML = `
    <form method="GET" action="" onsubmit="return adopt_pet(event)">
        <div class="calendar">
            <div class="calendar-header">
                <div class="calendar-swipe" onclick="changeMonth(0)">
                    <
                </div>
                <div class="calendar-title">
                    Wybierz dzień adopcji
                </div>
                <div class="calendar-swipe" onclick="changeMonth(1)">
                    >
                </div>
            </div>
            <div class="month">
                ${months[displayedMonth-1]} ${displayedYear}
            </div>
            <div class="weekdays flex">
                <div class="weekday">pon</div>
                <div class="weekday">wt</div>
                <div class="weekday">śr</div>
                <div class="weekday">czw</div>
                <div class="weekday">pt</div>
                <div class="weekday">sb</div>
                <div class="weekday">nd</div>
            </div>
            <div class="days flex">
                ${dayslist}
            </div>
        </div>
        <div class="calendar-confirm">
            <input type="checkbox" id="confirmdate" required/>
            <label for="confirmdate">
            Potwierdzam adopcję i zobowiązuję stawić się osobiście w wybranym wyżej terminie 
            w placówce schroniska w celu adopcji zwierzęcia</label>        
            <button type="submit" class="confirmadopt">
                POTWIERDŹ
            </button>
        </div>
    </form>
    `;

    let daysDivs = document.getElementsByClassName('day')
    for(let i = 0; i < daysDivs.length; i++) {
        daysDivs[i].addEventListener('click', function() {
            changeDay(daysDivs, i+1, this)
        })
    }
}

function adopt_pet(event) {
    event.preventDefault();
    let userData = localStorage.getItem('session');
    let allUsers = JSON.parse(localStorage.getItem('users'));
    let animalsData = JSON.parse(localStorage.getItem('animals'));
    let sheltersData = JSON.parse(localStorage.getItem('shelters'));
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));

    if(userData == null) {
        window.location.href = 'login_adopt.html?id=' + id;
        return false;
    }

    let user = JSON.parse(userData);
    let animal = animalsData[id-1];

    animal['active'] = false;
    animal['adopted_at'] = pickedDay + "." + displayedMonth + "." + displayedYear
    user['data']['adopted'].push(id);

    for(let i = 0; i < allUsers.length; i++) {
        if(allUsers[i]['id'] == user['data']['id']) {
            allUsers[i]['adopted'].push(id);
            break;
        }
    }

    for(let shelter of sheltersData) {
        let found = false;
        for(let i = 0; i < shelter['active'].length; i++) {
            if(shelter['active'][i] == id) {
                shelter['active'].splice(i, 1);
                shelter['inactive'].push(id);
                found = true;
                break;
            }
        }
        if(found) break;
    }

    localStorage.setItem('session', JSON.stringify(user));
    localStorage.setItem('animals', JSON.stringify(animalsData));
    localStorage.setItem('shelters', JSON.stringify(sheltersData));
    localStorage.setItem('users', JSON.stringify(allUsers));
    location.href = 'successful_adoption.html';
    return false;
}