import arhiz from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
import cheliabinsk from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg';
import ivanovo from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg';
import kamchatka from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg';
import holmogorsky from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg';
import baikal from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';

const initialCards = [
    {
      name: "Архыз",
      link: arhiz,
    },
    {
      name: "Челябинская область",
      link:  cheliabinsk,
    },
    {
      name: "Иваново",
      link: ivanovo,
    },
    {
      name: "Камчатка",
      link: kamchatka,
    },
    {
      name: "Холмогорский район",
      link: holmogorsky,
    },
    {
      name: "Байкал",
      link: baikal,
    }
];
// @todo: Функция создания карточки

const createCard = (cards, deleteCallback) => {

  const cardItem = cardtemplate.querySelector('.card').cloneNode(true);
  const cardsImg = cardItem.querySelector('.card__image');
  const cardsTtl = cardItem.querySelector('.card__title');

  cardsImg.src = cards.link;
  cardsImg.alt = cards.name; 
  cardsTtl.textContent = cards.name;

  cardItem.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
  
  return cardItem;
};

// @todo: Функция удаления карточки
const deleteCallback = (event) => {
  event.target.closest('.card').remove();
}
export { initialCards, createCard, deleteCallback };