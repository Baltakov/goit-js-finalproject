import { galleryItems } from "./gallery-items.js";
// Получаем элемент .gallery в DOM.
const gallery = document.querySelector(".gallery");
// Получаем массив всех элементов .gallery__image в DOM.
const galleryImages = document.querySelectorAll(".gallery__image");

// Функция createMarkup() принимает массив элементов галереи в качестве
// входных данных и возвращает строку, содержащую HTML - разметку для галереи.
function createMarkup(galleryItems) {
  return (
    galleryItems
      .map(
        ({ preview, original, description }) =>
          // Для каждого объекта в массиве galleryItems создаём элемент
          //    li с классом gallery__item
          // Внутри элемента li создаём элемент a с классом gallery__link
          //    и ссылкой на изображение original
          // Внутри элемента a создаём элемент img с классом gallery__image,
          //    src равным preview и alt равным description
          `<li class="gallery__item">
          <a class="gallery__link" href="${original}">
          <img class="gallery__image"
          src="${preview}" 
          alt="${description}" />
        </a>
      </li>`
      )
      // Все элементы li объединяем в строку HTML-разметки
      .join("")
  );
}

// Устанавливаем свойство innerHTML элемента gallery равным строке HTML - разметки,
//      возвращенной функцией createMarkup()
gallery.innerHTML = createMarkup(galleryItems);

// Инициализация библиотеки SimpleLightbox
const lightbox = new SimpleLightbox(".gallery a", {
  // Отображение подписи к изображению
  captions: true,
  // Добавляем подпись к изображению из атрибута alt
  captionsData: "alt",
  // Положение подписи
  captionPosition: "bottom",
  // Задержка перед отображением подписи
  captionDelay: 250,
});

console.log(galleryItems);
