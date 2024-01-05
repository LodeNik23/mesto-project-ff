import "./pages/index.css"; 
import {
  openPopup, 
  closePopup, 
  closeEsc, 
  closePopupByClick} from "./components/modal"; 
import {
  initialCards} from "./components/cards"; 
import {
  createCard, 
  likeCard} from "./components/card";
import {
  enableValidation, 
  validationConfig, 
  clearValidation} from "./components/validation";

import {deleteMyCard, addCard, сhangeUserData, avatarSnd, getUserData, getInitialCards} from "./components/api.js";

// @todo: Темплейт карточки 

// @todo: DOM узлы 
const allcards = document.querySelector('.places__list'); 
const profile = document.querySelector('.profile'); 

const profileEditButton = profile.querySelector('.profile__edit-button'); 
const profileAddButton = profile.querySelector('.profile__add-button'); 

const profileTitle = profile.querySelector('.profile__title'); 
const profileDescription = profile.querySelector('.profile__description'); 
const profileAvatar = profile.querySelector(".profile__image");

const popups = document.querySelectorAll(".popup"); 

const profileForm = document.querySelector('.popup__form[name="edit-profile"]'); 

// Попап изменить профиль
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupEditProfileBtn = popupEditProfile.querySelector(".popup__button");
const popupProfileForm = document.forms["edit-profile"];
const nameInput = profileForm.querySelector('.popup__input_type_name'); 
const jobInput = profileForm.querySelector('.popup__input_type_description'); 

// Попап создать карточку
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardBtn = popupNewCard.querySelector(".popup__button");
const cardForm = document.querySelector('.popup__form[name="new-place"]'); 
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name'); 
const cardLinkInput = cardForm.querySelector('.popup__input_type_url'); 

// Попап увеличить изображение
const popupImageBox = document.querySelector(".popup_type_image");
const popupImage = popupImageBox.querySelector(".popup__image"); 
const popupCaption = popupImageBox.querySelector(".popup__caption");
 

// Попап изменить аватар
const popupAvatarChenge = document.querySelector(".popup_type_edit_avatar");
const popupAvatarButton = popupAvatarChenge.querySelector(".popup__button");
const popupAvatarForm = document.querySelector('.popup__form[name="avatar-change"]'); 
const popupAvatarLinkInput = popupAvatarForm.querySelector('.popup__input_type_url');

// Попап подтверждения удаления карточки
const popupRemoveCard = document.querySelector(".popup_remove_card");
const popupRemoveCardBtn = popupRemoveCard.querySelector(".popup__button");


export let profileId = "";

// @todo: Вывести карточки на страницу 
 
 Promise.all([getUserData(),getInitialCards()])
 
 .then(([profileData, cardsData])=>{
    profileId = profileData._id;
    console.log([cardsData]);
    
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url(\\${profileData.avatar})`;
   
    cardsData.forEach((cards) => {    
      allcards.append(createCard(cards, profileId, likeCard, removeMyCard,  openImageClick));
    });
 })
 .catch((error)=>
   console.log('данные не обработаны / promise:', error)
 );

// Включить валидацию
enableValidation(validationConfig);


 //Данные профиля  
/* function handleFormSubmitProfile(evt){ 
  evt.preventDefault();   
  profileTitle.textContent = nameInput.value; 
  profileDescription.textContent = jobInput.value; 
  closePopup(popupEditProfile); 
}; 
*/ 
  function handleFormSubmitProfile(evt){ 
  evt.preventDefault();

  const btnText = popupEditProfileBtn.textContent;
  popupEditProfileBtn.textContent = "Сохранение...";

  сhangeUserData(nameInput.value, jobInput.value)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;

      closePopup(popupEditProfile);
    })
    .catch((error) => console.log('данные профиля не обработаны:', error))
    .finally(() => (popupEditProfileBtn.textContent = btnText));
    clearValidation(profileForm, validationConfig);
  };

//Добавить карточку 

/* function handleFormSubmitNewCard(evt){ 
  evt.preventDefault();   
  const newCard = createCard( 
    {name:cardNameInput.value, link: cardLinkInput.value}, deleteCallback, likeCard, openImageClick); 
    allcards.prepend(newCard); 
  closePopup(popupNewCard); 
  cardForm.reset(); 
}; */

function handleFormSubmitNewCard(evt){ 
  evt.preventDefault();   
  const btnText = popupNewCardBtn.textContent;
  popupNewCardBtn.textContent = "Сохранение...";

  addCard(cardNameInput.value, cardLinkInput.value)
  .then((cards) => {
    const newCard = createCard(cards, profileId, likeCard, removeMyCard,  openImageClick);
    allcards.prepend(newCard);
    closePopup(popupNewCard);
    cardForm.reset(); 
  })
  .catch((error) => console.log('данные карточки не обработаны:', error))
  .finally(() => (popupNewCardBtn.textContent = btnText));
  clearValidation(cardForm, validationConfig);  
};

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
    .catch((error) => 
    console.log('не удалить/ removeMyCard', error));
}

// Удаление карточки при подтверждении popup
popupRemoveCardBtn.addEventListener("click", handleRemoveClick);

//Увеличить изображение 

function openImageClick(evt) { 
  const card = evt.target.closest('.card'), 
  cardImage = card.querySelector('.card__image'), 
  cardTitle = card.querySelector('.card__title'); 
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
    .catch((error) =>
    console.log('данные аватара не обработаны', error)
    )
    .finally(() => (popupAvatarButton.textContent = BtnText));
  clearValidation(popupAvatarForm, validationConfig);
}

//Обработчики 

profileForm.addEventListener('submit', handleFormSubmitProfile); 
cardForm.addEventListener('submit', handleFormSubmitNewCard); 
popupAvatarForm.addEventListener("submit", changeAvatarFormSubmit); 

profileEditButton.addEventListener('click',() => { 
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent; 
  openPopup(popupEditProfile); 
  clearValidation(popupProfileForm, validationConfig);  
}); 

profileAddButton.addEventListener('click',() => openPopup(popupNewCard)); 
clearValidation(popupNewCard, validationConfig); 
//newCard-cardForm?

profileAvatar.addEventListener("click", () => {
  popupAvatarLinkInput.value = profileAvatar.style.backgroundImage.replace(
    /url\(["']?(.*?)["']?\)/,"$1"
    );
  openPopup(popupAvatarChenge);  
  clearValidation(popupAvatarForm, validationConfig);
});

popups.forEach((popup) => { 
  popup.addEventListener('mousedown', (evt) => { 
    closePopupByClick(evt, popup);     
}); 
});