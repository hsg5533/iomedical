const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const mapImage = document.getElementById("mapImage");

if (modal && modalImage && mapImage) {
  mapImage.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImage.src = mapImage.src;
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
