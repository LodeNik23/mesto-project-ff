const initialCards = [
    {
      name: "Архыз",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      name: "Челябинская область",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      name: "Иваново",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: "Камчатка",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      name: "Холмогорский район",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: "Байкал",
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];
// @todo: Функция создания карточки
/*при включении в функию 'likeCard, deleteCallback' - ломается работа*/ 
function createCard(cards, openImageClick) {
  const cardtemplate = document.querySelector("#card-template").content,
    cardItem = cardtemplate.querySelector(".card").cloneNode(true),
    cardImg = cardItem.querySelector(".card__image"),
    cardTtl = cardItem.querySelector(".card__title"),
    likeBtn = cardItem.querySelector(".card__like-button"),
    deleteBtn = cardItem.querySelector(".card__delete-button");
  cardImg.src = cards.link;
  cardImg.alt = cards.name;
  cardTtl.textContent = cards.name;
  cardImg.addEventListener("click", openImageClick);
   deleteBtn.addEventListener("click", deleteCallback);
  /* likeBtn.addEventListener("click", likeCard); если раскомитить - перестает работать*/
  
  return cardItem;
}

// @todo: Функция лайка карточки

const likeCard = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
   evt.target.classList.toggle('card__like-button_is-active'); 
  // console.log("likeCard")
  };
}; 

// @todo: Функция удаления карточки
const deleteCallback = (evt) => {
  evt.target.closest('.card').remove();
//  console.log("likeCard");
}

export { initialCards, createCard, deleteCallback, likeCard};