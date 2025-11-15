const bar = document.querySelector("#bar");
const nav = document.querySelector("#navbar");
const theme = document.querySelector("#theme");

bar.addEventListener("click", () => {
  nav.classList.toggle("active");
});

theme.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    theme.classList.remove("fa-circle-half-stroke");
    theme.classList.add("fa-sun");
  } else {
    theme.classList.add("fa-circle-half-stroke");
    theme.classList.remove("fa-sun");
  }
});
