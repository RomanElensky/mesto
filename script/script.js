const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const formElement = document.querySelector('.popup__input-container');
const inputName = document.querySelector('.popup__input_type_name');
const inputInfo = document.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardSection = document.querySelector('.card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup__type_edit-profile');
const popupAddCard = document.querySelector('.popup__type_add-card');
const inputCard = document.querySelector('.popup__input_type_card');
const inputLink = document.querySelector('.popup__input_type_link');
const popupOpenImage = document.querySelector('.popup__type_open-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');
const cardTemplate = document.querySelector('.card__template').content;


// Open/Close popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// popup Edit Form
function popupOpenEditForm() {
    openPopup(popupEditProfile)
    inputName.value = profileName.textContent;
    inputInfo.value = profileDescription.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputInfo.value;
    closePopup(popupEditProfile)
}

// popup Card Form
function popupOpenAddCard() {
    openPopup(popupAddCard)
}

function formSubmitCard(evt) {
    evt.preventDefault();
    renderCard({name: inputCard.value, link: inputLink.value });
    closePopup(popupAddCard);
}

popupCloseButton.forEach(function(item) {
    const activeClose = item.closest('.popup');
    item.addEventListener('click', function() {
        closePopup(activeClose);
    });
});

// Cards function  
function createCard(item) {
    const cardElement = cardTemplate.querySelector('.card__element').cloneNode(true);
    const viewImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__name').textContent = item.name;
    viewImage.src = item.link;
    viewImage.alt = item.name;

    // Like function
    const likeButton = cardElement.querySelector('.card__like');
    function clickedLikeButton(evt) {
        evt.target.classList.toggle('.card__like_clicked');
    }

    likeButton.addEventListener('click', clickedLikeButton);

    // Remove cards function
    const trashButton = document.querySelector('.card__trash-button');
    function deleteCard(evt) {
    evt.target.closest('.card__element').remove();
    }

    trashButton.addEventListener('click', deleteCard);

    return cardElement;
}

function renderCard(item) {
    const newCard = createCard(item)
    cardSection.prepend(newCard);
}

initialCards.forEach(renderCard);

// View images function
function openImage(viewImage) {
    popupImage.src = viewImage.src
    popupImage.alt = viewImage.alt
    popupImageTitle.textContent = viewImage.alt
    openPopup(popupOpenImage)
}

formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', popupOpenEditForm);
profileAddButton.addEventListener('click', popupOpenAddCard);