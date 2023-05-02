// Calendar cells
const calcell = document.querySelectorAll(".calendar-container > div:not(:first-child) > div");

// Array of months & days names
const month_name = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
const day_name = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

// Page Switch
const calendarSelect = document.querySelector(".calendar-select");
const usersSelect = document.querySelector(".users-select");
const calendarPage = document.querySelector(".calendar-page");
const usersPage = document.querySelector(".users-page");

// Scoreboard Info
const scoreboard_day = document.querySelector('.scoreboard-day');
const scoreboard_month = document.querySelector('.scoreboard-month');
const scoreboard_year = document.querySelector('.scoreboard-year');
const scoreboard_day_value = document.querySelector('.scoreboard-day-value');
const scoreboard_month_value = document.querySelector('.scoreboard-month-value');
const scoreboard_year_value = document.querySelector('.scoreboard-year-value');

// Switch Month date info
const date_info = document.querySelector('.date_info');

// Pinned date
const selected_date = document.querySelector('.date-selector');

// Hours submit button
const submitButton = document.getElementById('submit-button');

// Set date
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// Set selectedCell to null
let selectedCell = null;

// Set switch month button cooldown to false
let isCountdown = false;


// Page switch function
function switchSelected() {
  // Switch the selected class
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


// Display the calendar dates for a given month and year
function displayCalendarContent(month, year, data) {
  // Get the first day of the month
  var firstDay = new Date(year, month-1, 1).getDay();
  // Get the last day of the previous month
  var prevMonthLastDay = new Date(year, month-1, 0).getDate();

  if (firstDay === 0) {
    firstDay = 7;
  }

  // Fill in dates for the previous month
  for (var i = 0; i < firstDay-1; i++) {
    calcell[i].innerHTML = prevMonthLastDay - firstDay + i + 2;
    calcell[i].style.opacity = '0.5';
    calcell[i].style.cursor = 'default';
    calcell[i].style.backgroundColor = 'white';
  }

  // Loop to display all the dates of the month
  var day = 1;
  for (var i = firstDay-1; i < calcell.length; i++) {
    // Fill in dates for the next month
    if (day > new Date(year, month, 0).getDate()) {
      calcell[i].innerHTML = i - (firstDay - 2) - new Date(year, month, 0).getDate();
      calcell[i].style.opacity = '0.5';
      calcell[i].style.cursor = 'default';
      calcell[i].style.backgroundColor = 'white';

    // Fill in dates for the current month
    } else {
      calcell[i].setAttribute('id', (day + '/' + month + '/' + year).toString());
      calcell[i].innerHTML = day;
      calcell[i].style.opacity = '1';
      calcell[i].style.cursor = 'pointer';
      calcell[i].style.backgroundColor = 'white';
      for (var j = 0; j < data.length; j++) {
        if (day == data[j].date) {
          calcell[i].style.backgroundColor = '#63e6bf66';
        }
      }
      day++;
    }
  }
  scoreboard_month.innerHTML = month_name[Number(month - 1)];
  scoreboard_year.innerHTML = year;
  date_info.innerHTML = (month_name[month - 1] + ' ' + year);
}


// Precedent & Next month button
function changeMonth(value) {
  if(!isCountdown) {
    isCountdown = true;

    if (value == 'precedent') {
      month--;
      if (month < 1) {
        month = 12;
        year--;
      }
    } else {
      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
    }
    if (selectedCell) {
      selectedCell.classList.remove('selected');
    }
    getData('1', month.toString().padStart(2, '0'), year);

    let cooldownTime = 500;

    setTimeout(function() {
      isCountdown = false;
    }, cooldownTime);
  }
}

// Selected Cell function
function selectCell(cell) {
  if (selectedCell) {
    selectedCell.classList.remove('selected');
  }
  cell.classList.add('selected');
  selectedCell = cell;
}

// Calendar Cells add click eventlistener
calcell.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.style.opacity == '1') {
      selectCell(cell);
      const date = new Date(year, month - 1, parseInt(cell.innerHTML));
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      selected_date.innerHTML = date.toLocaleDateString('fr-FR', options);
      scoreboard_day.innerHTML = day_name[date.getDay()];
    }
  });
});


// Ajout d'un écouteur d'événement au clic sur le bouton
submitButton.addEventListener('click', function(event) {
  event.preventDefault(); // Empêcher la soumission du formulaire

  let input = document.querySelector('.hours-input');
  let inputValue = input.value;

  let select = document.getElementById('dropdown');
  let selectedValue = select.value;


  if(!selectedValue) {
    alert('veuillez sélectionner un profil');
  } else if (typeof selectedCell === 'undefined' || selectedCell === null) {
    alert('veuillez sélectionner une date');
  } else if (!inputValue) {
    alert('veuillez entrer une valeur.');
  } else if (isNaN(inputValue)) {
    alert('veuillez entrer un nombre');
  } else {
    console.log('id: ' + selectedValue + ', date:  ' + selectedCell.id + ', value: ' + inputValue);

    let formData = new FormData();
    formData.append('user_id', selectedValue);
    formData.append('date', selectedCell.id);
    formData.append('value', inputValue);

    // Envoi des données via AJAX
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'send_date.php');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.log('Erreur : ' + xhr.status);
      }
    };
    xhr.send(formData);
    input.value = '';
    setTimeout(() => {
      getData('1', month.toString().padStart(2, '0'), year);
    }, 500);
  }
});

let dataArray = [];

function getData(user_id, month, year) {
  let formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('month', month);
  formData.append('year', year);

  // Envoi des données via AJAX
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'get_data.php');
  xhr.onload = function() {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);

      // Stocker les données dans un tableau
      let dataArray = [];
      let totalYearValue = 0;
      for (let i = 0; i < data.length; i++) {
        let date = new Date(data[i].date);
        let dayData = { date: date.getDate(), value: data[i].value };
        dataArray.push(dayData);
        totalYearValue += data[i].value; // Ajout du calcul de la somme des valeurs de l'année
      }

      displayCalendarContent(month, year, dataArray);
      console.log('Total des valeurs de l\'année ' + year + ' : ' + totalYearValue); // Affichage du total dans la console
    } else {
      console.log('Erreur : ' + xhr.status);
    }
  };
  xhr.send(formData);
}

let myData = getData('1', month.toString().padStart(2, '0'), year);