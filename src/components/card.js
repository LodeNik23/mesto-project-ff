import {addLikeCardSnd, deleteLikeCardSnd} from "./api";

// @todo: Функция создания карточки

    function createCard(cards, profileId, likeCardStand, deleteCallbackStand, openImageClick) {
      const cardTemplate = document.querySelector("#card-template").content;           
      const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
      const cardImg = cardItem.querySelector(".card__image");      
      const cardTtl = cardItem.querySelector(".card__title");      
      const likeBtn = cardItem.querySelector(".card__like-button");      
      const deleteBtn = cardItem.querySelector(".card__delete-button");
      const likeCounter = cardItem.querySelector(".card__like-counter");
            
      cardImg.src = cards.link; 
      cardImg.alt = cards.name; 
      cardTtl.textContent = cards.name;
      likeCounter.textContent = cards.likes.length;     
    
    //блокировка кнопки удаления
      if (profileId !== cards.owner["_id"]) {
        deleteBtn.remove();
      } else {
        deleteBtn.addEventListener("click",() => {
          deleteCallbackStand(cardItem, cards);
        });
      }
      
    //проверка лайков
      if (isLikeMine(cards, profileId)) {
        likeBtn.classList.add("card__like-button_is-active");
      } else {
        likeBtn.classList.remove("card__like-button_is-active");
      };

      
      cardImg.addEventListener("click", openImageClick); 
      
      likeBtn.addEventListener("click", () => {
        likeCardStand(cards, profileId, cardItem);
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
  const likeCounter = cardItem.querySelector(".card__like-counter");
    
  if (isLikeMine(cards, profileId)) {
    console.log('abrvalg');
    deleteLikeCardSnd(cards)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        likeBtn.classList.remove('card__like-button_is-active');
        cards.likes = res.likes;
      })
      .catch((error) => {
        console.error('doh',error);
      });

  } else {
    
    addLikeCardSnd(cards)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        
        likeBtn.classList.add("card__like-button_is-active");
        
        cards.likes = res.likes;
      })
      .catch((error) => {
        console.log('auch',error);
      });
  }
}

function isLikeMine(cards, profileId) {
  return cards.likes.some((itm) => itm._id === profileId);  
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