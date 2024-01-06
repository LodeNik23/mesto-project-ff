import { addLikeCardSnd, deleteLikeCardSnd } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(
  cardData,
  profileId,
  likeCardStand,
  deleteCallbackStand,
  openImageClick
) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardItem.querySelector(".card__image");
  const cardTtl = cardItem.querySelector(".card__title");
  const likeBtn = cardItem.querySelector(".card__like-button");
  const deleteBtn = cardItem.querySelector(".card__delete-button");
  const likeCounter = cardItem.querySelector(".card__like-counter");

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTtl.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  //блокировка кнопки удаления
  if (profileId !== cardData.owner["_id"]) {
    deleteBtn.remove();
  } else {
    deleteBtn.addEventListener("click", () => {
      deleteCallbackStand(cardItem, cardData);
    });
  }

  //проверка лайков
  if (isLikeMine(cardData, profileId)) {
    likeBtn.classList.add("card__like-button_is-active");
  } else {
    likeBtn.classList.remove("card__like-button_is-active");
  }

  cardImg.addEventListener("click", openImageClick);
  likeBtn.addEventListener("click", () => {
    likeCardStand(cardData, profileId, cardItem);
  });

  cardItem.id = cardData["_id"];

  return cardItem;
}

// @todo: Функция лайка карточки
function likeCard(cardData, profileId, cardItem) {
  const likeBtn = cardItem.querySelector(".card__like-button");
  const likeCounter = cardItem.querySelector(".card__like-counter");
  if (isLikeMine(cardData, profileId)) {
    deleteLikeCardSnd(cardData._id)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        likeBtn.classList.remove("card__like-button_is-active");
        cardData.likes = res.likes;
      })
      .catch((error) => {
        console.error("doh", error);
      });
  } else {
    addLikeCardSnd(cardData._id)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        likeBtn.classList.add("card__like-button_is-active");
        cardData.likes = res.likes;
      })
      .catch((error) => {
        console.log("auch", error);
      });
  }
}

function isLikeMine(cardData, profileId) {
  return cardData.likes.some((item) => item._id === profileId);
}

export { createCard, likeCard };
