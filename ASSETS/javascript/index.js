const observer = new IntersectionObserver(
  (e) => {
    e.forEach((e) => {
      e.isIntersecting &&
        requestAnimationFrame(() => {
          e.target.classList.contains("hero-hidden")
            ? e.target.classList.add("hero-show")
            : e.target.classList.contains("hidden")
            ? e.target.classList.add("fade-up")
            : e.target.classList.contains("zoom-hidden")
            ? e.target.classList.add("zoom-in")
            : e.target.classList.contains("slide-hidden")
            ? e.target.classList.add("slide-show")
            : e.target.classList.contains("flip-hidden") &&
              e.target.classList.add("flip-show");
        });
    });
  },
  { root: null, threshold: 0.2, rootMargin: "0px" }
);
document.addEventListener("DOMContentLoaded", () => {
  (document.querySelector("#loadingContainer").style.display = "none"),
    (document.querySelector("#container").style.display = "flex"),
    AOS.init({
      duration: 1500,
      easing: "ease-out-cubic",
      once: !0,
      offset: 100,
    });
  let e = () => {
    var e;
    let t = [
      document.querySelector(".main-section-txt"),
      document.querySelector("#contactSubsection"),
    ];
    t.forEach((e) => {
      e && (e.classList.add("hidden"), observer.observe(e));
    }),
      document.querySelectorAll(".subhero").forEach((e, t) => {
        e.classList.add("zoom-hidden"),
          e.classList.add(`delay-${100 * t}`),
          observer.observe(e);
      });
    let s = [
      document.querySelector("#lineSkillSection"),
      document.querySelector("#barSkillSection"),
      document.querySelector("#educationBarSection"),
    ];
    s.forEach((e, t) => {
      e &&
        (e.classList.add("zoom-hidden"),
        e.classList.add(`delay-${100 * t}`),
        observer.observe(e));
    });
    let o = document.querySelector("#experiences");
    o && (o.classList.add("slide-hidden"), observer.observe(o));
    let r = document.querySelectorAll(".cardContainer");
    r.forEach((e, t) => {
      e.classList.add("flip-hidden"),
        e.classList.add(`delay-${Math.min(200 * t, 800)}`),
        observer.observe(e);
    });
  };
  e();
});
var themeBtn = document.querySelector("#theme-btn"),
  themeTag = document.querySelector("#theme"),
  lightMode = "ASSETS/styles/light.css",
  darkMode = "ASSETS/styles/dark.css",
  portfolioPic = document.getElementById("portfolioPic"),
  themeStorage = localStorage.getItem("theme"),
  loadingContainer = document.getElementById("loadingContainer");
switch ((themeBtn.addEventListener("click", () => {
    themeTag.getAttribute("href") === lightMode
      ? (themeTag.setAttribute("href", darkMode),
        (themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-sun'><i>"),
        localStorage.setItem("theme", darkMode),
        portfolioPic.setAttribute("src", "ASSETS/IMAGES/portfolio.png"))
      : (themeTag.setAttribute("href", lightMode),
        (themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-moon'><i>"),
        localStorage.setItem("theme", lightMode),
        portfolioPic.setAttribute("src", "ASSETS/IMAGES/portfolio-light.png"));
  }),themeStorage)) {
  case lightMode:
    themeTag.setAttribute("href", lightMode),
      (themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-moon'><i>"),
      localStorage.setItem("theme", lightMode),
      portfolioPic.setAttribute("src", "ASSETS/IMAGES/portfolio-light.png");
    break;
  case darkMode:
    themeTag.setAttribute("href", darkMode),
      (themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-sun'><i>"),
      localStorage.setItem("theme", darkMode),
      portfolioPic.setAttribute("src", "ASSETS/IMAGES/portfolio.png");
}
