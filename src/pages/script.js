import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../components/initialCards.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { profileEditButton,
    inputName,
    inputInfo,
    profileAddButton,
    popupEditProfile,
    popupAddCard,
    popupContainerTypeCard,
    popupContainerTypeForm } from "../utils/constants.js"

const validationList = {
    formElement: '.popup__input-container',
    inputElement: 'input.popup__input',
    buttonElemnt: '.popup__submit-button',
    buttonElemntDisabled: 'popup__submit-button_disabled',
    inputErrorElement: 'popup__input_type_error',
    spanErrorElement: 'popup__input_type_span-error'
}

const addCardValidation = new FormValidator(validationList, popupContainerTypeCard);
const editProfileValidation = new FormValidator(validationList, popupContainerTypeForm);

const popupWithImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo({nameSelector:'.profile__name',
  descriptionSelector:'.profile__description'});

const popupTypeCard = new PopupWithForm({ handleSubmit: (inputsValues) => {
    const card = createCard(inputsValues.cardName, inputsValues.cardLink, '.card__template');
    cardsList.addItem(card);
  }
}, '.popup_type_card');

// Cards function
function createCard(cardName, cardLink, cardSelector) {
    const card = new Card({ name:cardName, link:cardLink, handleCardClick: () => {
          popupWithImage.open(cardName, cardLink)
        },
      },  cardSelector);
    const cardElement = card.generateCard();
    return cardElement;
}

const cardsList = new Section({ items: initialCards, renderer: (item) => {
      const card = createCard(item.name, item.link, '.card__template');
      cardsList.addItem(card);
    },
}, '.card' );
 
cardsList.renderItems();

// popup Edit Form
const popupProfile = new PopupWithForm({
    handleSubmit:(inputsValues) => {
      userInfo.setUserInfo({
        name: inputsValues.profileName,
        description: inputsValues.profileDescription
      })
}}, '.popup_type_edit');

profileEditButton.addEventListener('click', () => {
    const userInformation = userInfo.getUserInfo();
    const userName = userInformation.name;
    const userDescription = userInformation.description;
    inputName.value = userName;
    inputInfo.value = userDescription;
    popupProfile.open();
})

// popup Card Form
profileAddButton.addEventListener('click', () => {
  popupTypeCard.open();
});

popupWithImage.setEventListeners();
popupTypeCard.setEventListeners();
popupProfile.setEventListeners();


editProfileValidation.enableValidation();

addCardValidation.enableValidation();