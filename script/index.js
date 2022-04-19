import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const validationList = {
    formElement: '.popup__input-container',
    inputElement: 'input.popup__input',
    fieldsetElement: '.popup__fieldset',
    buttonElemnt: 'popup__submit-button',
    inputErrorElement: 'popup__input_type_error',
    spanErrorElement: 'popup__input_type_span-error'
}

const profileEditButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputInfo = document.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardSection = document.querySelector('.card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_card');
const inputCard = document.querySelector('.popup__input_type_card');
const inputLink = document.querySelector('.popup__input_type_link');
const popupOpenImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');
const cardTemplate = document.querySelector('.card__template').content;
const popupInputTypeCard = document.querySelector('.popup__input-container_type_card');
const popupCardSubmitButton = document.querySelector('.popup__submit-button_type_card');

const addCardValidation = new FormValidator(validationList, popupAddCard);
const editProfileValidation = new FormValidator(validationList, popupEditProfile);

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// Open/Close popup
function openPopup(popups) {
    popups.classList.add('popup_opened');
    closePopupESCEvent();
}

function closePopup(popups) {
    popups.classList.remove('popup_opened');
    closePopupESCRemoveEvent();
}

// popup Edit Form
function openEditFormPopup() {
    inputName.value = profileName.textContent;
    inputInfo.value = profileDescription.textContent;
    openPopup(popupEditProfile)
}

function handlerSubmitFormProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputInfo.value;
    closePopup(popupEditProfile)
}

// popup Card Form
function openAddCardPopup() {
    openPopup(popupAddCard)
}

function handlerFormSubmitCard(evt) {
    evt.preventDefault();
    renderCard({ name: inputCard.value, link: inputLink.value });
    closePopup(popupAddCard);
}

popupCloseButtons.forEach(function(item) {
    const popup = item.closest('.popup');
    item.addEventListener('click', function() {
        closePopup(popup);
    });
});

// Cards function
function createCard(cardInfo) {
   const card = new Card(cardInfo, cardTemplate);
   const cardElement = card.generateCard();
   return cardElement;
}

function renderCard(cardInfo) {
    cardSection.prepend(createCard(cardInfo));
}

// View images function
export function openImage(imageLink, imageName) {
    popupImage.src = imageLink
    popupImage.alt = imageName
    popupImage.textContent = imageName
    openPopup(popupOpenImage)
}

// Close popup overlay click
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    })
})

// Close popup "ESC" click
function closePopupESC (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function closePopupESCEvent() {
    document.addEventListener('keydown', closePopupESC);
}

function closePopupESCRemoveEvent() {
    document.removeEventListener('keydown', closePopupESC);
}

profileEditButton.addEventListener('click', openEditFormPopup);
profileAddButton.addEventListener('click', openAddCardPopup);
popupEditProfile.addEventListener('submit', handlerSubmitFormProfile);
popupAddCard.addEventListener('submit', handlerFormSubmitCard);

initialCards.forEach(cardInfo => renderCard(cardInfo));

editProfileValidation.enableValidation();

addCardValidation.enableValidation();