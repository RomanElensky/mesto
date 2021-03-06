export const profileEditButton = document.querySelector('.profile__edit-button');
export const inputName = document.querySelector('.popup__input_type_name');
export const inputInfo = document.querySelector('.popup__input_type_info');
export const profileAddButton = document.querySelector('.profile__add-button');
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupAddCard = document.querySelector('.popup_type_card');
export const popupContainerTypeCard = popupAddCard.querySelector('.popup__input-container');
export const popupContainerTypeForm = popupEditProfile.querySelector('.popup__input-container');
export const submitProfileButton = popupEditProfile.querySelector('.popup__submit-button');
export const submitCardButton = popupAddCard.querySelector('.popup__submit-button');
export const profileImage = document.querySelector('.profile__image');
export const editAvatarButton = document.querySelector('.profile__edit-image');
export const popupDeleteCard = document.querySelector('.popup_type_delete');
export const popupEditAvatar = document.querySelector('.popup_type_avatar');
export const submitAvatarButton = popupEditAvatar.querySelector('.popup__submit-button');
export const popupContainerTypeAvatar = popupEditAvatar.querySelector('.popup__input-container');

export const myToken = 'c34b6ff3-3b58-4b83-9a26-376e4318434a';
export const groupId = 'cohort-41';

export const validationList = {
    formElement: '.popup__input-container',
    inputElement: 'input.popup__input',
    buttonElemnt: '.popup__submit-button',
    buttonElemntDisabled: 'popup__submit-button_disabled',
    inputErrorElement: 'popup__input_type_error',
    spanErrorElement: 'popup__input_type_span-error'
}