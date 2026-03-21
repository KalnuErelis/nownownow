const THEME_KEY = "theme";

const getStoredTheme = () => {
  const storedTheme = localStorage.getItem(THEME_KEY);
  return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
};

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getPreferredTheme = () => {
  return getStoredTheme() ?? getSystemTheme();
};

const getCurrentTheme = () => {
  const activeTheme = document.documentElement.getAttribute("data-theme");
  return activeTheme === "light" || activeTheme === "dark" ? activeTheme : getPreferredTheme();
};

const applyTheme = (theme = getPreferredTheme()) => {
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const persistTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

const syncThemeButton = () => {
  const button = document.getElementById("theme-btn");
  if (!button) return;

  const currentTheme = getCurrentTheme();
  const nextThemeLabel = currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  button.setAttribute("aria-label", nextThemeLabel);
  button.setAttribute("title", nextThemeLabel);
};

const toggleTheme = () => {
  const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
  persistTheme(nextTheme);
  applyTheme(nextTheme);
  syncThemeButton();
};

const setupThemeToggle = () => {
  const button = document.getElementById("theme-btn");
  if (!button) return;

  if (button.dataset.bound !== "true") {
    button.dataset.bound = "true";
    button.addEventListener("click", toggleTheme);
  }

  applyTheme();
  syncThemeButton();
};

applyTheme();

window.addEventListener("DOMContentLoaded", setupThemeToggle);
document.addEventListener("astro:before-swap", () => {
  applyTheme();
});
document.addEventListener("astro:before-swap", (event) => {
  const nextDocument = event.newDocument;
  if (!nextDocument) return;

  nextDocument.documentElement.setAttribute("data-theme", getCurrentTheme());
});
document.addEventListener("astro:after-swap", () => {
  applyTheme();
  syncThemeButton();
});
document.addEventListener("astro:page-load", setupThemeToggle);
