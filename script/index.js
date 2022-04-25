import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { openPopup, closePopup } from './utils.js';

const validationList = {
    formElement: '.popup__input-container',
    inputElement: 'input.popup__input',
    buttonElemnt: '.popup__submit-button',
    buttonElemntDisabled: 'popup__submit-button_disabled',
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
const cardTemplate = document.querySelector('.card__template').content;
const popupContainerTypeCard = popupAddCard.querySelector('.popup__input-container');
const popupContainerTypeForm = popupEditProfile.querySelector('.popup__input-container');
const popupCardSubmitButton = document.querySelector('.popup__submit-button_type_card');
const popupInputTypeCard = document.querySelector('.popup__input-container_type_card');

const addCardValidation = new FormValidator(validationList, popupContainerTypeCard);
const editProfileValidation = new FormValidator(validationList, popupContainerTypeForm);

// popup Edit Form
function openEditFormPopup() {
    inputName.value = profileName.textContent;
    inputInfo.value = profileDescription.textContent;
    editProfileValidation.resetValidation();
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
    addCardValidation.resetValidation();
    openPopup(popupAddCard)
}

function handlerFormSubmitCard(evt) {
    evt.preventDefault();
    renderCard({ name: inputCard.value, link: inputLink.value });
    closePopup(popupAddCard);
    popupInputTypeCard.reset();
    popupCardSubmitButton.setAttribute("disabled", true);
    popupCardSubmitButton.classList.add("popup__submit-button_disabled");
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

// Close popup overlay click
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    })
})

profileEditButton.addEventListener('click', openEditFormPopup);
profileAddButton.addEventListener('click', openAddCardPopup);
popupContainerTypeForm.addEventListener('submit', handlerSubmitFormProfile);
popupContainerTypeCard.addEventListener('submit', handlerFormSubmitCard);

initialCards.forEach(cardInfo => renderCard(cardInfo));

editProfileValidation.enableValidation();

addCardValidation.enableValidation();