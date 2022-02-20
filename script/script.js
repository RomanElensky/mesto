const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__input-container');
const inputName = document.querySelector('.popup__input_type_name');
const inputInfo = document.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');



function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function popupOpenForm() {
    openPopup()
    inputName.value = profileName.textContent;
    inputInfo.value = profileDescription.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputInfo.value;
    closePopup()
}

formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', popupOpenForm);
popupCloseButton.addEventListener('click', closePopup);