// Calendar cells
const calcell = document.querySelectorAll(".calendar-container > div:not(:first-child) > div");

// Array of month names
const month_name = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];

// Page switch function
function switchSelected() {
  // Get the elements to switch
  const calendarSelect = document.querySelector(".calendar-select");
  const usersSelect = document.querySelector(".users-select");

  const calendarPage = document.querySelector(".calendar-page");
  const usersPage = document.querySelector(".users-page");

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
function displayCalendarContent(month, year) {
  // Get the first day of the month
  var firstDay = new Date(year, month-1, 1).getDay();

  if (firstDay === 0) {
    firstDay = 7;
  }

  // Get the last day of the previous month
  var prevMonthLastDay = new Date(year, month-1, 0).getDate();

  // Fill in dates for the previous month
  for (var i = 0; i < firstDay-1; i++) {
    calcell[i].innerHTML = prevMonthLastDay - firstDay + i + 2;
    calcell[i].style.opacity = '0.5';
    calcell[i].style.cursor = 'default';
  }

  // Loop to display all the dates of the month
  var day = 1;
  for (var i = firstDay-1; i < calcell.length; i++) {
    // Fill in dates for the next month
    if (day > new Date(year, month, 0).getDate()) {
      calcell[i].innerHTML = i - (firstDay - 2) - new Date(year, month, 0).getDate();
      calcell[i].style.opacity = '0.5';
      calcell[i].style.cursor = 'default';
    // Fill in dates for the current month
    } else {
      calcell[i].setAttribute('id', (day + '/' + month + '/' + year).toString());
      console.log((day + '/' + month + '/' + year).toString());
      calcell[i].innerHTML = day;
      calcell[i].style.opacity = '1';
      calcell[i].style.cursor = 'pointer';
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

let selectedCell = null;

// Precedent & Next month button
function changeMonth(value) {
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
  displayCalendarContent(month, year);
  let date_info = document.querySelector('.date_info');
  date_info.innerHTML = (month_name[month - 1] + ' ' + year)
}

function selectCell(cell) {
  if (selectedCell) {
    selectedCell.classList.remove('selected');
  }
  cell.classList.add('selected');
  selectedCell = cell;
}

// Date text
let selected_date = document.getElementById('date');

// Calendar Cells add click eventlistener
calcell.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.style.opacity == '1') {
      selectCell(cell);
      const date = new Date(year, month - 1, parseInt(cell.innerHTML));
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      selected_date.innerHTML = date.toLocaleDateString('fr-FR', options);
    }
  });
});

// Récupération de l'élément button
const submitButton = document.getElementById('submit-button');

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
  }
});