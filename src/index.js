import "./pages/index.css";
import {openPopup, closePopup, closeEsc} from "./components/popups";
import {initialCards, createCard, deleteCallback, likeCard} from "./components/cards";

// @todo: Темплейт карточки

// @todo: DOM узлы
const allcards = document.querySelector('.places__list');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileAddButton = profile.querySelector('.profile__add-button');

const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

const cardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardForm.querySelector('.popup__input_type_url');

//ПОПАПЫ
const popups = document.querySelectorAll(".popup"),
  popupEditProfile = document.querySelector(".popup_type_edit"),
  popupNewCard = document.querySelector(".popup_type_new-card"),
  popupImageBox = document.querySelector(".popup_type_image"),
  popupImage = popupImageBox.querySelector(".popup__image"),
  popupCaption = popupImageBox.querySelector(".popup__caption");

// @todo: Вывести карточки на страницу
initialCards.forEach((cardItm) => {
    allcards.append(createCard(cardItm, openImageClick, deleteCallback));
});

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
    {name:cardNameInput.value, link: cardLinkInput.value}, openImageClick, likeCard, deleteCallback);
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
  popupImage.alt = cardTitle.alt;
  popupCaption.textContent = cardTitle.textContent;

  openPopup(popupImageBox);
}

//Обработчики

profileForm.addEventListener('submit', handleFormSubmitProfile);
cardForm.addEventListener('submit', handleFormSubmitNewCard);
profileEditButton.addEventListener('click',() => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
openPopup(popupEditProfile);
});
profileAddButton.addEventListener('click',() => openPopup(popupNewCard));
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.matches('.popup_is-opened, .popup__close'))
      closePopup(popup);
  });
});

allcards.addEventListener('click', likeCard);

export {allcards};