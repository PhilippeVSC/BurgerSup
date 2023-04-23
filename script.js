// Calendar cells
const calcell = document.querySelectorAll(".calendar-container > div:not(:first-child) > div");

const month_name = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'décembre']

// Page switch function
function switchSelected() {
    const calendarSelect = document.querySelector(".calendar-select");
    const usersSelect = document.querySelector(".users-select");

    const calendarPage = document.querySelector(".calendar-page");
    const usersPage = document.querySelector(".users-page");
  
    if (!calendarSelect.classList.contains("selected")) {
      calendarSelect.classList.add("selected");
      usersSelect.classList.remove("selected");
      usersPage.style.transform = 'translateY(-100%)';
      calendarPage.style.transform = 'translateY(0)';
    }
    else if (!usersSelect.classList.contains("selected")) {
      usersSelect.classList.add("selected");
      calendarSelect.classList.remove("selected");
      usersPage.style.transform = 'translateY(0)';
      calendarPage.style.transform = 'translateY(100%)';
    }
}

function displayCalendarContent(month, year) {
  // Get the first day of the month
  var firstDay = new Date(year, month-1, 1).getDay();

  if (firstDay === 0) {
    firstDay = 7;
  }

  // Get the last day of the previous month
  var prevMonthLastDay = new Date(year, month-1, 0).getDate();
  
  // Precedent month
  for (var i = 0; i < firstDay-1; i++) {
    calcell[i].innerHTML = prevMonthLastDay - firstDay + i + 2;
    calcell[i].style.opacity = '0.5'
    calcell[i].style.cursor = 'default'
  }
  
  // Loop to display all the dates of the month
  var day = 1;
  for (var i = firstDay-1; i < calcell.length; i++) {
    // Next Month
    if (day > new Date(year, month, 0).getDate()) {
      calcell[i].innerHTML = i - (firstDay - 2) - new Date(year, month, 0).getDate();
      calcell[i].style.opacity = '0.5'
      calcell[i].style.cursor = 'default'
    // Actual Month
    } else {
      calcell[i].innerHTML = day;
      calcell[i].style.opacity = '1'
      calcell[i].style.cursor = 'pointer'
      day++;
    }
  }
}

// Actualise the calendar dates
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();
displayCalendarContent(month, year);

const btn_precedent = document.querySelector('.precedent-month-btn');
const btn_next = document.querySelector('.next-month-btn');

// Precedent & Next month button
function changeMonth(value) {
  if(value == 'precedent') {
    month--;
    if (month < 1) {
      month = 12;
      year--;
    }
    displayCalendarContent(month, year);
    console.log(month_name[month - 1], year)
  } else {
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
    displayCalendarContent(month, year);
    console.log(month_name[month - 1], year)
  }
}