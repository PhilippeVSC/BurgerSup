function switchSelected() {
    const calendarSelect = document.querySelector(".calendar-select");
    const usersSelect = document.querySelector(".users-select");
  
    if (!calendarSelect.classList.contains("selected")) {
      calendarSelect.classList.add("selected");
      usersSelect.classList.remove("selected");
    }
    else if (!usersSelect.classList.contains("selected")) {
      usersSelect.classList.add("selected");
      calendarSelect.classList.remove("selected");
    }
}