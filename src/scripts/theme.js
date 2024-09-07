const darkTheme = "night";
const lightTheme = "garden";

function applyTheme(theme) {
  if (theme == darkTheme){
    document.documentElement.classList.add('dark')
  } else if (theme == lightTheme){
    document.documentElement.classList.remove('dark')
  }
  document.documentElement.setAttribute("data-theme", theme);
  const themeController = document.querySelector(".theme-controller");
  if (themeController) {
    themeController.checked = theme === darkTheme;
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme);
  applyTheme(savedTheme);
  localStorage.setItem("theme", savedTheme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem("theme");
  const newTheme = currentTheme === lightTheme ? darkTheme : lightTheme;
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

window.onload = () => {
  initTheme();

  const themeController = document.getElementById("toggle-theme");
  if (themeController) {
    themeController.addEventListener("change", toggleTheme);
  }
};
