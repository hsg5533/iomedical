const toggleBtn = document.querySelector(".sns-toggle-button");
const fixedWrapper = document.querySelector(".sns-fixed-wrapper");

if (toggleBtn && fixedWrapper) {
  toggleBtn.addEventListener("click", () =>
    fixedWrapper.classList.toggle("open")
  );
}
