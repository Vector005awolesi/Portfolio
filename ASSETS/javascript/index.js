// THEME HANDLING
var lightThemeBtn = document.querySelector("#theme-btn");
var themeTag = document.querySelector("#theme");
lightThemeBtn.addEventListener("click" , ()=> {
    if(themeTag.getAttribute("href") === "ASSETS/styles/light.css"){
        themeTag.setAttribute("href" , "ASSETS/styles/dark.css");
        lightThemeBtn.innerHTML = "<i class = 'fas fa-sharp fa-sun'><i>";
        localStorage.setItem("theme" , "ASSETS/styles/dark.css"  );
    }
    else{
       themeTag.setAttribute("href" , "ASSETS/styles/light.css");
        lightThemeBtn.innerHTML = "<i class = 'fas fa-sharp fa-moon'><i>";
        localStorage.setItem("theme" , "ASSETS/styles/light.css"  ); 
    }     
});
// THEME STORING AND RETRIEVAL
if(localStorage.getItem("theme") === "ASSETS/styles/light.css"){
    themeTag.setAttribute("href" , "ASSETS/styles/light.css");
    lightThemeBtn.innerHTML = "<i class = 'fas fa-sharp fa-moon'><i>";
    localStorage.setItem("theme" , lightTheme ); 
}
else if(localStorage.getItem("theme") === "ASSETS/styles/dark.css"){
    themeTag.setAttribute("href" , "ASSETS/styles/dark.css");
    lightThemeBtn.innerHTML = "<i class = 'fas fa-sharp fa-sun'><i>";
    localStorage.setItem("theme" , darkTheme );
}
else{

}