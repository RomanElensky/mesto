const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__input-container');
const inputName = document.querySelector('.popup_input-name');
const inputInfo = document.querySelector('.popup_input-info');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupTypeEditProfile = document.querySelector('.popup_type_edit-profile');


function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function popupOpenForm() {
    openPopup(popupTypeEditProfile)
    inputName.value = profileName.textContent;
    inputInfo.value = profileDescription.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputInfo.value;
    closePopup(popupTypeEditProfile)
}

formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', popupOpenForm);
popupCloseButton.addEventListener('click', closePopup);