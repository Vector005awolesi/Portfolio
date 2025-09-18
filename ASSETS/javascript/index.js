// THEME HANDLING
var themeBtn = document.querySelector("#theme-btn");
var themeTag = document.querySelector("#theme");
var lightMode =  "ASSETS/styles/light.css";
var darkMode = "ASSETS/styles/dark.css";
var themeStorage = localStorage.getItem("theme");
themeBtn.addEventListener("click" , ()=> {
    if(themeTag.getAttribute("href") === lightMode){
        themeTag.setAttribute("href" , darkMode);
        themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-sun'><i>";
        localStorage.setItem("theme" , darkMode  );
    }
    else{
       themeTag.setAttribute("href" , lightMode);
        themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-moon'><i>";
        localStorage.setItem("theme" , lightMode  ); 
    }     
});
// THEME STORING AND RETRIEVAL
switch(themeStorage){
    case lightMode :   
    themeTag.setAttribute("href" , lightMode);
    themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-moon'><i>";
    localStorage.setItem("theme" , lightTheme ); 
    break;
    case darkMode : 
     themeTag.setAttribute("href" , darkMode);
    themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-sun'><i>";
    localStorage.setItem("theme" , darkTheme );
    break;
    default:;
}



// if(localStorage.getItem("theme") === lightMode){
//     themeTag.setAttribute("href" , lightMode);
//     themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-moon'><i>";
//     localStorage.setItem("theme" , lightTheme ); 
// }
// else if(localStorage.getItem("theme") === darkMode){
//     themeTag.setAttribute("href" , darkMode);
//     themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-sun'><i>";
//     localStorage.setItem("theme" , darkTheme );
// }
// else{

// }