// @todo: DOM узлы
export const allcards = document.querySelector(".places__list");
export const profile = document.querySelector(".profile");

export const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileAddButton = profile.querySelector(".profile__add-button");

export const profileTitle = profile.querySelector(".profile__title");
export const profileDescription = profile.querySelector(".profile__description");
export const profileAvatar = profile.querySelector(".profile__image");

export const popups = document.querySelectorAll(".popup");

export const profileForm = document.querySelector('.popup__form[name="edit-profile"]');

// Попап изменить профиль
export const popupEditProfile = document.querySelector(".popup_type_edit");
export const popupEditProfileBtn = popupEditProfile.querySelector(".popup__button");
export const popupProfileForm = document.forms["edit-profile"];
export const nameInput = profileForm.querySelector(".popup__input_type_name");
export const jobInput = profileForm.querySelector(".popup__input_type_description");

// Попап создать карточку
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupNewCardBtn = popupNewCard.querySelector(".popup__button");
export const cardForm = document.querySelector('.popup__form[name="new-place"]');
export const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
export const cardLinkInput = cardForm.querySelector(".popup__input_type_url");

// Попап увеличить изображение
export const popupImageBox = document.querySelector(".popup_type_image");
export const popupImage = popupImageBox.querySelector(".popup__image");
export const popupCaption = popupImageBox.querySelector(".popup__caption");

// Попап изменить аватар
export const popupAvatarChenge = document.querySelector(".popup_type_edit_avatar");
export const popupAvatarButton = popupAvatarChenge.querySelector(".popup__button");
export const popupAvatarForm = document.querySelector(
  '.popup__form[name="avatar-change"]'
);
export const popupAvatarLinkInput = popupAvatarForm.querySelector(
  ".popup__input_type_url"
);

// Попап подтверждения удаления карточки
export const popupRemoveCard = document.querySelector(".popup_remove_card");
export const popupRemoveCardBtn = popupRemoveCard.querySelector(".popup__button");
