import {addLikeCardSnd, deleteLikeCardSnd, deleteCard} from "./api";

const cardTemplate = document.querySelector("#card-template").content;  

// @todo: Функция создания карточки

    function createCard(cards, profileId, likeCardStand, deleteCallbackStand, openImageClickStand) {
                  
      const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
        console.log(cardItem.querySelector(".card__image"));

      cardImg = cardItem.querySelector(".card__image");
      cardTtl = cardItem.querySelector(".card__title");
      likeBtn = cardItem.querySelector(".card__like-button");
      deleteBtn = querySelector(".card__delete-button");
      likeCounter = cardItem.querySelector(".card__like-counter");
        
      cardImg.src = cards.link; 
      cardImg.alt = cards.name; 
      cardTtl.textContent = cards.name;
      likeCounter.textContent = cards.likes.length;

      
    
    //блокировка кнопки удаления
      if (profileId !==card.owner["_id"]) {
        deleteBtn.remove();
      } else {
        deleteBtn.addEventListener("click",() => {
          deleteCallbackStand(cardItem, cards);
        });
      }
    //проверка лайков
      if (checkMyLike(cards, profileId)) {
        likeBtn.classList.add("card__like-button_is-active");
      } else {
        likeBtn.classList.remove("card__like-button_is-active");
      };

      
      cardImg.addEventListener("click"(), openImageClickStand(cardItem)); 
      //нужен openImageClick в index?
      //deleteBtn.addEventListener("click", deleteCallback); 
      likeBtn.addEventListener("click", () => {
        likeCardStand(cardItem, cards);
      });  

      cardItem.id = cards["_id"];
    return cardItem;
  }

  /* @todo: Функция лайка карточки
 const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active'); 
}; 
*/
function likeCard(cards, profileId, cardItem) {
  const likeBtn = cardItem.querySelector(".card__like-button");
  const likeCounters = cardItem.querySelector(".card__like-counter");
    
  if (isLikeMine(cards, profileId)) {
    
    deleteLikeCardSnd(cards)
      .then((res) => {
        likeCounters.textContent = res.likes.length;
        likeBtn.classList.remove('card__like-button_is-active');
        cards.likes = res.likes;
      })
      .catch((error) => {
        console.error('doh',error);
      });

  } else {
    
    addLikeCardSnd(cards)
      .then((res) => {
        likeCounters.textContent = res.likes.length;
        likeBtn.classList.add("card__like-button_is-active");
        cards.likes = res.likes;
      })
      .catch((error) => {
        console.log('auch',error);
      });
  }
}

function isLikeMine(cards, profileId) {
  return cards.likes.some((item) => item["_id"] === profileId);
}

  export {createCard, likeCard};



  /*function createCard(cards, deleteCallback, likeCard, openImageClick) {
  const cardtemplate = document.querySelector("#card-template").content, 
  cardItem = cardtemplate.querySelector(".card").cloneNode(true), 
  cardImg = cardItem.querySelector(".card__image"), 
  cardTtl = cardItem.querySelector(".card__title"), 
  likeBtn = cardItem.querySelector(".card__like-button"), 
  deleteBtn = cardItem.querySelector(".card__delete-button"); 
  cardItem.id = cards["_id"];
  console.log('fuck' + cardItem.id);

  cardImg.src = cards.link; 
  cardImg.alt = cards.name; 
  cardTtl.textContent = cards.name; 
  cardImg.addEventListener("click", openImageClick); 
  deleteBtn.addEventListener("click", deleteCallback); 
  likeBtn.addEventListener("click", likeCard);
  return cardItem;
}
*/

/*
  // @todo: Функция лайка карточки
 const likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active'); 
  }; 

  // @todo: Функция удаления карточки
  const deleteCallback = (evt) => {
    evt.target.closest('.card').remove();
  }
  */