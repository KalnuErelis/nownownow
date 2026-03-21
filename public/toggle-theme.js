const storedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = storedTheme || (systemPrefersDark ? "dark" : "light");

document.documentElement.setAttribute("data-theme", theme);

window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("theme-btn");
  if (!button) return;

  button.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
});
