// Разбей задание на несколько подзадач:
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img, и указываться в href ссылки (это необходимо для доступности).
/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */
// Дополнительно
// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
  
import cards from './gallery-items.js'

const galleryRef = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const bigPicture = document.querySelector('.lightbox__image');

let currentPage = ''
const handleCatchEventByKeyboard = e => {
    if (e.key === 'Escape'){
        modalClose();
    }
    const data = {
        src: null,
        alt: null,
    }
    if (e.key === 'ArrowRight'){
        currentPage >= cards.length - 1 ? currentPage = 0: currentPage++;
        data.src = cards[currentPage].original;
        data.alt = cards[currentPage].description;
        useModalWithProps(data);
    }
    if (e.key === 'ArrowLeft'){
        currentPage === 0 ? currentPage = cards.length-1: currentPage--;
        data.src = cards[currentPage].original;
        data.alt = cards[currentPage].description;
        useModalWithProps(data);
    }
}
const useModalWithProps = ({src, alt}) => {
    bigPicture.src = src;
    bigPicture.alt = alt;
    window.addEventListener('keydown', handleCatchEventByKeyboard);
}
const getDataImgWithActiveImage = (itemPicture) => {
    if(!itemPicture){return}
    currentPage = itemPicture.dataset.source;
    return {src: itemPicture.dataset.source, alt: itemPicture.alt}
}
const getCurrentPage= (srs = '') => {
   cards.forEach((item, index) => {
       if (item.original === srs){
           currentPage = index;
           return;
       }
   })
}
const handleClickByImg = e => {
    e.preventDefault();
    const target = e.target;
    if (target.nodeName !== 'IMG'){
        return;
    }
    modal.classList.add('is-open');
    useModalWithProps(getDataImgWithActiveImage(target));
    getCurrentPage(getDataImgWithActiveImage(target).src);
}
const modalClose = () => {
    modal.classList.remove('is-open')
    bigPicture.src = '';
    bigPicture.alt = '';
    currentPage = '';
    window.removeEventListener('keydown', handleCatchEventByKeyboard);
}
const handleCatchEventByMouseClose= (e) => {
    const target = e.target;
    if (target.classList.contains('lightbox__overlay') || target.classList.contains('lightbox__button')){
        modalClose();
    }

}
const createCards = (data) => {
    return data.map(galeryItem => { return (`<li class="gallery__item"><a class="gallery__link" href="${galeryItem.original}"><img class="gallery__image" src="${galeryItem.preview}" data-source="${galeryItem.original}" alt="${galeryItem.description}" /></a></li>`)
    }).join(' ');
}





galleryRef.addEventListener('click', handleClickByImg);
modal.addEventListener('click',handleCatchEventByMouseClose);
galleryRef.innerHTML = createCards(cards);