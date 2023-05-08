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

let id = '0';


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
  var monthSumHours = 0;
  for (var i = firstDay-1; i < calcell.length; i++) {
    // Fill in dates for the next month
    if (day > new Date(year, month, 0).getDate()) {
      calcell[i].innerHTML = i - (firstDay - 2) - new Date(year, month, 0).getDate();
      calcell[i].style.opacity = '0.5';
      calcell[i].style.cursor = 'default';
      calcell[i].style.backgroundColor = 'white';

    // Fill in dates for the current month
    } else {
      calcell[i].classList.remove(...calcell[i].classList);
      calcell[i].setAttribute('id', (day + '/' + month + '/' + year).toString());
      calcell[i].innerHTML = day;
      calcell[i].style.opacity = '1';
      calcell[i].style.cursor = 'pointer';
      calcell[i].style.backgroundColor = 'white';
      for (var j = 0; j < data.length; j++) {
        if (day == data[j].date) {
          calcell[i].style.backgroundColor = '#63e6bf66';
          monthSumHours += parseInt(data[j].value);
          calcell[i].classList.add(parseInt(data[j].value));
        }
      }
      day++;
    }
  }
  scoreboard_month_value.innerHTML = (monthSumHours + 'h');
  scoreboard_month.innerHTML = month_name[Number(month - 1)];
  scoreboard_year.innerHTML = year;
  date_info.innerHTML = (month_name[month - 1] + ' ' + year);

  selectedCell = null;
  selected_date.innerHTML = 'Non sélectionné';
  scoreboard_day.innerHTML = 'Non sélectionné';
  scoreboard_day_value.innerHTML = '0h';
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
        getYearData(id, year);
      }
    }
    if (selectedCell) {
      selectedCell.classList.remove('selected');
    }
    getData(id, month.toString().padStart(2, '0'), year);

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
calcell.forEach((cell) => {
  cell.addEventListener('click', () => {
    if (cell.style.opacity == '1') {
      selectCell(cell);
      const date = new Date(year, month - 1, parseInt(cell.innerHTML));
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      selected_date.innerHTML = date.toLocaleDateString('fr-FR', options);
      scoreboard_day.innerHTML = day_name[date.getDay()];
      if(!isNaN(cell.classList.item(0))){
        scoreboard_day_value.innerHTML = (cell.classList.item(0) + 'h');
      } else {
        scoreboard_day_value.innerHTML = '0h';
      }
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
    input.value = '';
  } else if (typeof selectedCell === 'undefined' || selectedCell === null) {
    alert('veuillez sélectionner une date');
    input.value = '';
  } else if (!inputValue) {
    alert('veuillez entrer une valeur.');
    input.value = '';
  } else if (isNaN(inputValue)) {
    alert('veuillez entrer un nombre');
    input.value = '';
  } else {
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
    setTimeout(() => {
      getData(id, month.toString().padStart(2, '0'), year);
      getYearData(id, year);
      input.value = '';
    }, 500);
  }
});


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
      for (let i = 0; i < data.length; i++) {
        let date = new Date(data[i].date);
        let dayData = { date: date.getDate(), value: data[i].value };
        dataArray.push(dayData);
      }
      displayCalendarContent(month, year, dataArray);
    } else {
      console.log('Erreur : ' + xhr.status);
    }
  };
  xhr.send(formData);
}

function getYearData(user_id, year) {
  scoreboard_year_value.innerHTML = '0h';
  var xhttp = new XMLHttpRequest();

  // Définir la fonction de rappel qui sera exécutée lorsque la réponse sera prête
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(this.responseText == null || this.responseText == 0){
        scoreboard_year_value.innerHTML = '0h';
      } else {
        scoreboard_year_value.innerHTML = (this.responseText + 'h');
      }
    }
  };

  // Envoyer la requête POST au code PHP avec les paramètres user_id et year
  xhttp.open("POST", "get_year_data.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("user_id=" + user_id + "&year=" + year);
}

const dropdown = document.querySelector('.user-select');
dropdown.addEventListener('change', () => {
  changeID();
});

function changeID() {
  let dropdown_select = document.getElementById('dropdown');
  const selectedOption = dropdown_select.value;
  id = selectedOption.toString();

  if(!selectedOption) {
    id = '0';
  }
    getYearData(id, year);
    getData(id, month.toString().padStart(2, '0'), year);
}

changeID();