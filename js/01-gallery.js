import { galleryItems } from "./gallery-items.js";
// Change code below this line

const containerRef = document.querySelector(".gallery");
const galleryRef = createGllery(galleryItems);
containerRef.insertAdjacentHTML("beforeend", galleryRef);
containerRef.addEventListener("click", showOriginal);

function createGllery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
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
  const instance = basicLightbox.create(
    `
    <div class="modal">
      <img src="${event.target.dataset.source}" width= 100%>
    </div>
`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", closeOriginal);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", closeOriginal);
      },
    }
  );
  instance.show();

  function closeOriginal(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}
