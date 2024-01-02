import "./pages/index.css"; 
import {openPopup, closePopup, closeEsc, closePopupByClick} from "./components/modal"; 
import {initialCards} from "./components/cards"; 
import {createCard, likeCard} from "./components/card";
import {enableValidation, validationConfig, clearValidation} from "./components/validation";
import {getUserData, getInitialCards, сhangeUserData, addCard, deleteCard, AvatarSnd} from "./components/api.js";

// @todo: Темплейт карточки 

// @todo: DOM узлы 
const allcards = document.querySelector('.places__list'); 

const profile = document.querySelector('.profile'); 

const profileEditButton = profile.querySelector('.profile__edit-button'); 
const profileTitle = profile.querySelector('.profile__title'); 
const profileDescription = profile.querySelector('.profile__description'); 
const profileAddButton = profile.querySelector('.profile__add-button'); 
const profileAvatar = profile.querySelector(".profile__image");
 
const profileForm = document.querySelector('.popup__form[name="edit-profile"]'); 
const nameInput = profileForm.querySelector('.popup__input_type_name'); 
const jobInput = profileForm.querySelector('.popup__input_type_description'); 

const cardForm = document.querySelector('.popup__form[name="new-place"]'); 
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name'); 
const cardLinkInput = cardForm.querySelector('.popup__input_type_url'); 

const popupProfileForm = document.forms["edit-profile"];

//ПОПАПЫ 
const popups = document.querySelectorAll(".popup"), 
  popupEditProfile = document.querySelector(".popup_type_edit"), 
  popupNewCard = document.querySelector(".popup_type_new-card"), 
  popupImageBox = document.querySelector(".popup_type_image"), 
  popupImage = popupImageBox.querySelector(".popup__image"), 
  popupCaption = popupImageBox.querySelector(".popup__caption"); 

  export let profileId = "";

// @todo: Вывести карточки на страницу 

 
 /*Promise.all([getUserData(),getInitialCards()])
  .then(([profileData, cards])=>{
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url(\\${profileData.avatar})`;
    profileId = profileData._id;
    cards.forEach((cards) => {
      allcards.append(createCard(cards, profileId, removeMyCard, likeCard, openImageClick));
      });
  })
  .catch((error)=>
    console.log('данные не получены / promise:', error)
  );

*/

   
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

// удалить мою карточку 
function removeMyCard(cardItem, cards) {
  deleteCard(cards._id)
    .then(() => 
    deleteMyCard(cardItem))
    .catch((error) => 
    console.log('Что-то с карточкой / removeMyCard', error));
}

// Включить валидацию
enableValidation(validationConfig);

 //Данные профиля  
function handleFormSubmitProfile(evt){ 
  evt.preventDefault();   
  profileTitle.textContent = nameInput.value; 
  profileDescription.textContent = jobInput.value; 
  closePopup(popupEditProfile); 
}; 

//Добавить карточку 

function handleFormSubmitNewCard(evt){ 
  evt.preventDefault();   
  const newCard = createCard( 
    {name:cardNameInput.value, link: cardLinkInput.value}, deleteCallback, likeCard, openImageClick); 
    allcards.prepend(newCard); 
  closePopup(popupNewCard); 
  cardForm.reset(); 
}; 



// cardImage.addEventListener('click', (evt) => openImageClick(evt.target.alt, evt.target.src)); 

//Увеличить изображение 
function openImageClick(evt) { 
  const card = evt.target.closest('.card'), 
  cardImage = card.querySelector('.card__image'), 
  cardTitle = card.querySelector('.card__title'); 
  popupImage.src = cardImage.src; 
  popupCaption.textContent = cardTitle.textContent; 
  openPopup(popupImageBox); 
} 

//Обработчики 

profileForm.addEventListener('submit', handleFormSubmitProfile); 
cardForm.addEventListener('submit', handleFormSubmitNewCard); 

profileEditButton.addEventListener('click',() => { 
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent; 

clearValidation(popupProfileForm, validationConfig);  
openPopup(popupEditProfile); 
}); 

profileAddButton.addEventListener('click',() => openPopup(popupNewCard)); 
popups.forEach((popup) => { 
  popup.addEventListener('mousedown', (evt) => { 
    clearValidation(popupNewCard, validationConfig); 
    closePopupByClick(evt, popup);     
}); 
}); 
  
