const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme = getPreferredTheme()) => {
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

applyTheme();

const syncThemeButton = () => {
  const button = document.getElementById("theme-btn");
  if (!button) return;

  const currentTheme = applyTheme();
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
    const nextTheme = applyTheme() === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    syncThemeButton();
  });

  syncThemeButton();
};

window.addEventListener("DOMContentLoaded", setupThemeToggle);
document.addEventListener("astro:before-swap", () => applyTheme());
document.addEventListener("astro:after-swap", setupThemeToggle);
document.addEventListener("astro:page-load", () => {
  applyTheme();
  setupThemeToggle();
});
