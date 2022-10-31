import { galleryItems } from "./gallery-items.js";
// Change code below this line

const containerRef = document.querySelector(".gallery");
const galleryRef = createGllery(galleryItems);
containerRef.insertAdjacentHTML("beforeend", galleryRef);
containerRef.addEventListener("click", showOriginal);

let galleryNew = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  showCounter: true,
  loop: true,
});

function createGllery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
</div>`;
    })
    .join("");
}

function showOriginal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();
  const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${event.target.dataset.source}" width= 100%>
    </div>
`);

  instance.show();
  window.addEventListener("keydown", closeOriginal);

  function closeOriginal(event) {
    if (event.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", closeOriginal);
    }
  }
}
