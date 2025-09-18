// THEME HANDLING
var themeBtn = document.querySelector("#theme-btn");
var themeTag = document.querySelector("#theme");
var lightMode = "ASSETS/styles/light.css";
var darkMode = "ASSETS/styles/dark.css";
var portfolioPic = document.querySelector("#portfolio-img");
var themeStorage = localStorage.getItem("theme");
themeBtn.addEventListener("click", () => {
  if (themeTag.getAttribute("href") === lightMode) {
    themeTag.setAttribute("href", darkMode);
    themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-sun'><i>";
    localStorage.setItem("theme", darkMode);
    portfolioPic.setAttribute("src" , "ASSETS/IMAGES/portfolio.png");

  } else {
    themeTag.setAttribute("href", lightMode);
    themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-moon'><i>";
    localStorage.setItem("theme", lightMode);
    portfolioPic.setAttribute("src" , "ASSETS/IMAGES/portfolio-light.png");

  }
});
// THEME STORING AND RETRIEVAL
switch (themeStorage) {
  case lightMode:
    themeTag.setAttribute("href", lightMode);
    themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-moon'><i>";
    localStorage.setItem("theme", lightTheme);
    portfolioPic.setAttribute("src" , "ASSETS/IMAGES/portfolio-light.png");
    break;
  case darkMode:
    themeTag.setAttribute("href", darkMode);
    themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-sun'><i>";
    localStorage.setItem("theme", darkTheme);
    portfolioPic.setAttribute("src" , "ASSETS/IMAGES/portfolio.png")
    break;
  default:;
}


