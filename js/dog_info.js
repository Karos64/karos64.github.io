const date = new Date()

const today = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

let displayedMonth = month;
let displayedYear = year;

function changeDay(allDays, day, el) {
    if(day <= today && displayedMonth == month && displayedYear == year) return false;
    for(let i = 0; i < allDays.length; i++) {
        allDays[i].classList.remove('active')
    }
    el.classList.add('active')
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
    const startDay = new Date(displayedYear, displayedMonth-1, 1).getDay()

    dayslist = ''
    for (let index = 1; index < startDay+7; index++) {
        dayslist += `<div class="day"> </div>`
        
    }
    for (let index = 1; index <= daysInMonth(displayedMonth, displayedYear); index++) {
        if(index == today && displayedMonth == month && displayedYear == year) {
            dayslist += '<div class="day active">' + index + '</div>'
            continue
        }
        dayslist += '<div class="day">' + index + '</div>'
    }

    el = document.getElementById('doginfo');

    el.innerHTML = `
    <form method="GET" action="">
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
            changeDay(daysDivs, i, this)
        })
    }
}