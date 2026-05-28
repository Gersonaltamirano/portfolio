const header = document.querySelector(".site-header");
const themeButtons = document.querySelectorAll("[data-theme-choice]");
const themeStorageKey = "portfolio-theme";
const validThemes = ["light", "dark"];
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

const getSystemTheme = () => (systemThemeQuery.matches ? "dark" : "light");

const setTheme = (theme) => {
  const selectedTheme = validThemes.includes(theme) ? theme : getSystemTheme();
  document.documentElement.dataset.theme = selectedTheme;

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeChoice === selectedTheme;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

setTheme(localStorage.getItem(themeStorageKey) || getSystemTheme());

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTheme = button.dataset.themeChoice;
    localStorage.setItem(themeStorageKey, selectedTheme);
    setTheme(selectedTheme);
  });
});

systemThemeQuery.addEventListener("change", () => {
  if (localStorage.getItem(themeStorageKey)) return;
  setTheme(getSystemTheme());
});

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
