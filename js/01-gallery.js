import { galleryItems } from "./gallery-items.js";

// Получаем элемент .gallery в DOM.
const gallery = document.querySelector(".gallery");
// Получаеv массив всех элементов .gallery__image в DOM.
const galleryImages = document.querySelectorAll(".gallery__image");

// Функция createMarkup() принимает массив элементов галереи в качестве
// входных данных и возвращает строку, содержащую HTML - разметку для галереи.
function createMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    )
    .join("");
}

gallery.innerHTML = createMarkup(galleryItems);

// Добавляем обработчик события "click" к элементу .gallery
gallery.addEventListener("click", openOriginalIMG);
// modalOpen отслеживает, открыто ли модальное окно
let modalOpen = false;
// instance хранит ссылку на объект модального окна
let instance;

// Функция openOriginalIMG() открывает модальное окно с оригинальным изображением.
function openOriginalIMG(e) {
  e.preventDefault();

  const imgOriginal = e.target.closest(".gallery__link");

  // Используем объект настроек для добавления слушателя клавиатуры при открытии модального окна.
  instance = basicLightbox.create(
    `
    <img src="${imgOriginal.getAttribute("href")}" width="800" height="600">
  `,
    {
      onShow: () => {
        modalOpen = true;
        // Добавляем обработчик события "keydown" к документу при открытии модального окна.
        document.addEventListener("keydown", closeModal);
      },
      onClose: () => {
        modalOpen = false;
        // Убираем обработчик события "keydown" с документа при закрытии модального окна.
        document.removeEventListener("keydown", closeModal);
      },
    }
  );

  instance.show();
}

//функци closeModal() принимает объект события клавиатуры в качестве
//входных данных и закрывает модальное окно.
function closeModal(event) {
  if (event.key === "Escape" && modalOpen) {
    instance.close();
    modalOpen = false;
    document.removeEventListener("keydown", closeModal);
  }
}
console.log(galleryItems);
