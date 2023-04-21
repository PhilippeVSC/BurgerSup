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