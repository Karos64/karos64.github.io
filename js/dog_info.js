const date = new Date()

const today = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()

const startDay = new Date("01." + month + "." + year).getDay()

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function changeDay(allDays, day, el) {
    if(day <= today) return false;
    for(let i = 0; i < allDays.length; i++) {
        allDays[i].classList.remove('active')
    }
    el.classList.add('active')
}

const months = [
    "styczeń", "luty", "marzec", "kwiecień", "maj",
    "czerwiec", "lipiec", "sierpień", "wrzesień",
    "październik", "listopad", "grudzień"
]

dayslist = ''
for (let index = 1; index < startDay; index++) {
    dayslist += `<div class="day"> </div>`
    
}
for (let index = 1; index <= daysInMonth(month, year); index++) {
    if(index == today) {
        dayslist += '<div class="day active">' + index + '</div>'
        continue
    }
    dayslist += '<div class="day">' + index + '</div>'
}

const showCalendar = () => {
    el = document.getElementById('doginfo');

    el.innerHTML = `
    <form method="GET" action="">
        <div class="calendar">
            <div class="calendar-title">
                Wybierz dzień adopcji
            </div>
            <div class="month">
                ${months[month-1]}
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
    console.log(daysDivs)
    for(let i = 0; i < daysDivs.length; i++) {
        daysDivs[i].addEventListener('click', function() {
            changeDay(daysDivs, i, this)
        })
    }
}