const storedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = storedTheme || (systemPrefersDark ? "dark" : "light");

document.documentElement.setAttribute("data-theme", theme);

const syncThemeButton = () => {
  const button = document.getElementById("theme-btn");
  if (!button) return;

  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  button.setAttribute("aria-label", currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  button.setAttribute("title", currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode");
};

const setupThemeToggle = () => {
  const button = document.getElementById("theme-btn");
  if (!button || button.dataset.bound === "true") {
    syncThemeButton();
    return;
  }

  button.dataset.bound = "true";

  button.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    syncThemeButton();
  });

  syncThemeButton();
};

window.addEventListener("DOMContentLoaded", setupThemeToggle);
document.addEventListener("astro:after-swap", setupThemeToggle);
