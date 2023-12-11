// @todo: Функция создания карточки
/*корзина увеличивает изображение, лайк - удаляет карточку*/ 
function createCard(cards, deleteCallback, likeCard, openImageClick) {
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
    likeBtn.addEventListener("click", likeCard);
    return cardItem;
  }

  // @todo: Функция лайка карточки
const likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active'); 
  }; 
  
  // @todo: Функция удаления карточки
  const deleteCallback = (evt) => {
    evt.target.closest('.card').remove();
  }
  
  export {createCard, deleteCallback, likeCard};