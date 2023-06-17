import SimpleLightbox from 'simple-lightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.querySelector('.gallery');
  function generateGalleryItemsMarkup() {
    let markup = '';
    galleryItems.forEach(function (item) {
      markup += `
              <a class="gallery__item" href="${item.original}">
                <img class="gallery__image" src="${item.preview}" alt="${item.description}" title="${item.description}">
              </a>
            `;
    });
    return markup;
  }
  gallery.innerHTML = generateGalleryItemsMarkup();
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionPosition: 'bottom',
  });
});
console.log(galleryItems);
