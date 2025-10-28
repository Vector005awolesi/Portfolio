// Scroll Animation Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Add animation class when element enters viewport
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                if (entry.target.classList.contains('hero-hidden')) {
                    entry.target.classList.add('hero-show');
                } else if (entry.target.classList.contains('hidden')) {
                    entry.target.classList.add('fade-up');
                } else if (entry.target.classList.contains('zoom-hidden')) {
                    entry.target.classList.add('zoom-in');
                } else if (entry.target.classList.contains('slide-hidden')) {
                    entry.target.classList.add('slide-show');
                } else if (entry.target.classList.contains('flip-hidden')) {
                    entry.target.classList.add('flip-show');
                }
            });
        }
    });
}, {
    root: null, // Changed to null to observe relative to viewport
    threshold: 0.2, // Lower threshold for earlier triggering
    rootMargin: '0px' // Remove margin for precise triggering
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1500,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Pre-set all elements to their initial states
    const setupAnimations = () => {
        // Text content fade animations
        const fadeElements = [
            document.querySelector('.main-section-txt'),
            document.querySelector('#contactSubsection')
        ];
        fadeElements.forEach(el => {
            if (el) {
                el.classList.add('hidden');
                observer.observe(el);
            }
        });

        // Zoom animations for skills and education
        const zoomElements = [
            document.querySelector('#skillShowcase'),
            document.querySelector('#barSkillSection'),
            document.querySelector('#educationBarSection')
        ];
        zoomElements.forEach((el, index) => {
            if (el) {
                el.classList.add('zoom-hidden');
                el.classList.add(`delay-${index * 100}`);
                observer.observe(el);
            }
        });

        // Slide animations for experience timeline
        const experienceSection = document.querySelector('#experiences');
        if (experienceSection) {
            experienceSection.classList.add('slide-hidden');
            observer.observe(experienceSection);
        }

        // Flip animations for project cards with gentler staggered delay
        const projectCards = document.querySelectorAll('.cardContainer');
        projectCards.forEach((card, index) => {
            card.classList.add('flip-hidden');
            card.classList.add(`delay-${Math.min(index * 200, 800)}`);
            observer.observe(card);
        });
    };

    // Execute the setup function
    setupAnimations();
});

// THEME HANDLING
var themeBtn = document.querySelector("#theme-btn");
var themeTag = document.querySelector("#theme");
var lightMode = "ASSETS/styles/light.css";
var darkMode = "ASSETS/styles/dark.css";
var portfolioPic = document.getElementById("portfolioPic");
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
    localStorage.setItem("theme", lightMode );
    portfolioPic.setAttribute("src" , "ASSETS/IMAGES/portfolio-light.png");
    break;
  case darkMode:
    themeTag.setAttribute("href", darkMode);
    themeBtn.innerHTML = "<i class = 'fas fa-sharp fa-sun'><i>";
    localStorage.setItem("theme", darkMode);
    portfolioPic.setAttribute("src" , "ASSETS/IMAGES/portfolio.png");
    break;
  default:;
}

