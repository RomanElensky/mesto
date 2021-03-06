import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDelete from '../components/PopupDelete.js';
import {
  profileEditButton,
  inputName,
  inputInfo,
  profileAddButton,
  popupContainerTypeCard,
  popupContainerTypeForm,
  editAvatarButton,
  submitProfileButton,
  submitCardButton,
  popupContainerTypeAvatar,
  submitAvatarButton,
  validationList
} from "../utils/constants.js"

const addCardValidation = new FormValidator(validationList, popupContainerTypeCard);
const editProfileValidation = new FormValidator(validationList, popupContainerTypeForm);
const editAvatarValidation = new FormValidator(validationList, popupContainerTypeAvatar);

const popupWithImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description', avatarSelector: '.profile__image'
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'c34b6ff3-3b58-4b83-9a26-376e4318434a',
    'Content-Type': 'application/json'
  }
})

// Cards function
function createCard(cardName, cardInfo, cardSelector, cardOwner, myData, cardLikes, cardId) {
  const card = new Card({
    name: cardName, link: cardInfo, handleCardClick: () => {
      popupWithImage.open(cardName, cardInfo)
    },
    handleDeleteClick: (id) => {
      popupDeleteCard.cardId(id, cardElement);
      console.log(id);
      popupDeleteCard.open();
    },
    handleLikeClick: (id, likesObject) => {
      if (likesObject.some((likes) => likes._id === myData._id)) {
        api.deleteLike(id)
          .then(res => {
            card.unlikeCard(res)
          })
          .catch(err => console.log(`????????????: ${err}`))
      }
      else {
        api.addlike(id)
          .then(res => {
            card.likeCard(res)
          })
          .catch(err => console.log(`????????????: ${err}`))
      }
    }
  }, cardSelector, cardOwner, myData, cardLikes, cardId);
  const cardElement = card.generateCard();
  return cardElement;
}

Promise.all([api.getInfo(), api.getCards()])
  .then(([userData, data]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar
    });
    userInfo.setAvatar(userData);

    const cardsList = new Section({
      items: data, renderer: (item) => {
        const card = createCard(item.name, item.link, '.card__template',
          item.owner, userData, item.likes, item._id);
        cardsList.addItem(card);
      },
    }, '.card');

    cardsList.renderItems();

    const popupTypeCard = new PopupWithForm({
      handleSubmit: (inputsValues) => {
        submitCardButton.textContent = '????????????????????...';
        function addCard(cardInfo) {
          api.postCard({
            name: cardInfo.card_name,
            link: cardInfo.card_info
          })
            .then((res) => {
              const card = createCard(res.name, res.link, '.card__template', userData, userData, res.likes, res._id);
              cardsList.addItem(card);
              popupTypeCard.close()
            })
            .catch(err => console.log(`????????????: ${err}`))
            .finally(() => {
              submitCardButton.textContent = '??????????????';
            })
        }
        addCard(inputsValues)
      }
    }, '.popup_type_card');

    profileAddButton.addEventListener('click', () => {
      addCardValidation.resetValidation();
      popupTypeCard.open();
    });

    profileAddButton.addEventListener('click', () => {
      addCardValidation.resetValidation();
      popupTypeCard.open();
    });

    popupTypeCard.setEventListeners();
  })
  .catch(err => console.log(`????????????: ${err}`))

// popup Edit Form
const popupProfile = new PopupWithForm({
  handleSubmit: (inputsValues) => {
    submitProfileButton.textContent = '????????????????????...';
    function changeDescription(inputsValues) {
      api.patchInfo(inputsValues)
        .then((res) => {
          userInfo.setUserInfo({
            name: inputsValues.profile_name,
            description: inputsValues.profile_info
          })
          popupProfile.close();
        })
        .catch(err => console.log(`????????????: ${err}`))
        .finally(() => {
          submitProfileButton.textContent = '??????????????????';
        })
    }
    changeDescription(inputsValues)
  }
}, '.popup_type_edit');

profileEditButton.addEventListener('click', () => {
  const userInformation = userInfo.getUserInfo();
  const userName = userInformation.name;
  const userDescription = userInformation.description;
  inputName.value = userName;
  inputInfo.value = userDescription;
  editProfileValidation.resetValidation();
  popupProfile.open();
})

// popup Avatar
const popupAvatar = new PopupWithForm({
  handleSubmit: (inputsValues) => {
    submitAvatarButton.textContent = '????????????????????...';
    function changeAvatar() {
      api.patchAvatar(inputsValues)
        .then((res) => {
          userInfo.setAvatar(res)
          popupAvatar.close();
        })
        .catch(err => console.log(`????????????: ${err}`))
        .finally(() => {
          submitAvatarButton.textContent = '??????????????????';
        })
    }
    changeAvatar(inputsValues)
  }
}, '.popup_type_avatar')

editAvatarButton.addEventListener('click', () => {
  editAvatarValidation.resetValidation();
  popupAvatar.open();
});

//popupDelete
const popupDeleteCard = new PopupDelete(
  {
    handleSubmit: (cardID, cardElement) => {
      function deleteCard(cardId) {
        api.deleteCard(cardId)
          .then(() => {
            popupDeleteCard.close();
            cardElement.remove();
          })
          .catch(err => console.log(`????????????: ${err}`))
      }
      deleteCard(cardID);
    }
  },
  '.popup_type_delete',
);


popupWithImage.setEventListeners();
popupProfile.setEventListeners();
popupDeleteCard.setEventListeners();
popupAvatar.setEventListeners();


editProfileValidation.enableValidation();
addCardValidation.enableValidation();
editAvatarValidation.enableValidation();