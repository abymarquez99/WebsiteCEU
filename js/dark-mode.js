 document.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const header = document.querySelector(".nav"); // Selector para el encabezado.
  
    const userPreference = localStorage.getItem("modePreference");
    console.log(userPreference)
  
    if (userPreference === "dark") {
      body.classList.add("dark-mode");
      header.classList.add("dark-mode");
    }
  
    darkModeToggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      header.classList.toggle("dark-mode");
  
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("modePreference", "dark");
      } else {
        localStorage.setItem("modePreference", "light");
      }
    });
  });
 
