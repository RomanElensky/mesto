const ProfileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form-info');
const popupSubmitButton = document.querySelector('.popup__submit-button');
const inputName = document.querySelector('.popup__input-name');
const inputInfo = document.querySelector('.popup__input-info');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupWindow = document.querySelector('.popup_type_edit-profile');
const elements = document.querySelector('.card');
const card = document.querySelector('.card__element');



function openPopup() {
    popup.classList.add('popup__opened');
}

ProfileEditButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup__opened');
}

popupCloseButton.addEventListener('click', closePopup);

function popupOpenForm() {
    openPopup(popupWindow);
    inputName.value = profileName.textContent;
    inputInfo.value = profileDescription.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputInfo.value;
    closePopup(popupWindow);
}

formElement.addEventListener('submit', formSubmitHandler); 

const likeButton = card.querySelector('.card__like');

likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like_clicked');
})
