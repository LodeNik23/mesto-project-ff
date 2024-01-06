import "./pages/index.css";
import { openPopup, closePopup, closePopupByClick } from "./components/modal";
import { createCard, likeCard } from "./components/card";
import {
  enableValidation,
  validationConfig,
  clearValidation,
} from "./components/validation";

import {
  deleteMyCard,
  addCard,
  сhangeUserData,
  avatarSnd,
  getUserData,
  getInitialCards,
} from "./components/api.js";

import {allcards, profile, 
  profileEditButton, profileAddButton, 
  profileTitle, profileDescription, profileAvatar, 
  popups, profileForm, 
  popupEditProfile, popupEditProfileBtn, popupProfileForm, nameInput, jobInput, 
  popupNewCard, popupNewCardBtn, cardForm, cardNameInput, cardLinkInput,
  popupImageBox, popupImage, popupCaption, 
  popupAvatarChenge, popupAvatarButton, popupAvatarForm, popupAvatarLinkInput,
  popupRemoveCard, popupRemoveCardBtn} from "./constants.js";


export let profileId = "";

// @todo: Вывести карточки на страницу

Promise.all([getUserData(), getInitialCards()])

  .then(([profileData, cardsData]) => {
    profileId = profileData._id;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url(\\${profileData.avatar})`;

    cardsData.forEach((cards) => {
      allcards.append(
        createCard(cards, profileId, likeCard, removeMyCard, openImageClick)
      );
    });
  })
  .catch((error) => console.log("данные не обработаны / promise:", error));

// Включить валидацию
enableValidation(validationConfig);

//Данные профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const btnText = popupEditProfileBtn.textContent;
  popupEditProfileBtn.textContent = "Сохранение...";

  сhangeUserData(nameInput.value, jobInput.value)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;

      closePopup(popupEditProfile);
    })
    .catch((error) => console.log("данные профиля не обработаны:", error))
    .finally(() => (popupEditProfileBtn.textContent = btnText));
  clearValidation(profileForm, validationConfig);
}

//Добавить карточку
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const btnText = popupNewCardBtn.textContent;
  popupNewCardBtn.textContent = "Сохранение...";

  addCard(cardNameInput.value, cardLinkInput.value)
    .then((cards) => {
      const newCard = createCard(
        cards,
        profileId,
        likeCard,
        removeMyCard,
        openImageClick
      );
      allcards.prepend(newCard);
      closePopup(popupNewCard);
      cardForm.reset();
    })
    .catch((error) => console.log("данные карточки не обработаны:", error))
    .finally(() => (popupNewCardBtn.textContent = btnText));
  clearValidation(cardForm, validationConfig);
}

// Окно удаления карточки
function removeMyCard(cards) {
  openPopup(popupRemoveCard);
  popupRemoveCardBtn.dataset.cardId = cards.id;
}

//Удаление карточки
function handleRemoveClick(evt) {
  evt.preventDefault();
  const cardId = popupRemoveCardBtn.dataset.cardId;

  deleteMyCard(cardId)
    .then(() => {
      const RemovedCard = document.getElementById(cardId);
      RemovedCard.remove();
      popupRemoveCardBtn.dataset.cardId = "";
      closePopup(popupRemoveCard);
    })
    .catch((error) => console.log("не удалить/ removeMyCard", error));
}

// Удаление карточки при подтверждении popup
popupRemoveCardBtn.addEventListener("click", handleRemoveClick);

//Увеличить изображение

function openImageClick(evt) {
  const card = evt.target.closest(".card"),
    cardImage = card.querySelector(".card__image"),
    cardTitle = card.querySelector(".card__title");
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardTitle.textContent;

  openPopup(popupImageBox);
}

// Замена аватара
function changeAvatarFormSubmit(evt) {
  evt.preventDefault();

  const BtnText = popupAvatarButton.textContent;
  popupAvatarButton.textContent = "Сохранение...";
  avatarSnd(popupAvatarLinkInput.value)
    .then((profileData) => {
      profileAvatar.style.backgroundImage = `url(\\${profileData.avatar})`;
      closePopup(popupAvatarChenge);
    })
    .catch((error) => console.log("данные аватара не обработаны", error))
    .finally(() => (popupAvatarButton.textContent = BtnText));
  clearValidation(popupAvatarForm, validationConfig);
}

//Обработчики
profileForm.addEventListener("submit", handleFormSubmitProfile);
cardForm.addEventListener("submit", handleFormSubmitNewCard);
popupAvatarForm.addEventListener("submit", changeAvatarFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
  clearValidation(popupProfileForm, validationConfig);
});

profileAddButton.addEventListener("click", () => openPopup(popupNewCard));
clearValidation(popupNewCard, validationConfig);

profileAvatar.addEventListener("click", () => {
  popupAvatarLinkInput.value = profileAvatar.style.backgroundImage.replace(
    /url\(["']?(.*?)["']?\)/,
    "$1"
  );
  openPopup(popupAvatarChenge);
  clearValidation(popupAvatarForm, validationConfig);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    closePopupByClick(evt, popup);
  });
});
