const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const formElement = document.querySelector('.popup__input-container');
const inputName = document.querySelector('.popup__input_type_name');
const inputInfo = document.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cards = document.querySelectorAll('.card__element');
const cardSection = document.querySelector('.card');
const trashButton = document.querySelector('.card__trash-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup__type_edit-profile');
const popupAddCard = document.querySelector('.popup__type_add-card');
const inputCard = document.querySelector('.popup__input_type_card');
const inputLink = document.querySelector('.popup__input_type_link');
const popupOpenImage = document.querySelector('.popup__type_open-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');


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
    createCard ({name: inputCard.value, link: inputLink.value });
    closePopup(popupAddCard);
}

popupCloseButton.forEach(function(item) {
    const activeClose = item.closest('.popup');
    item.addEventListener('click', function() {
        closePopup(activeClose);
    });
});

// Cards function

function openCards() {
    initialCards.forEach(createCard)
}
    
function cardElement(item) {
    const viewImage = cards.querySelector('.card__image');
    cards.querySelector('.card__name').textContent = item.name;
    viewImage.src = item.link;
    viewImage.alt = item.name;
}

function createCard(item) {
    const cards = cardElement(item);
    cardSection.prepend(cards);
}
    
// Like function
cards.forEach(function(card) {
    const likeButton = card.querySelector('.card__like');
    
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like_clicked');
    })
})
    
function createCard(item) {
    const cards = cardElement(item);
    cardSection.prepend(cards);
}
    
// Remove cards function
function deleteCard(evt) {
    evt.target.closest('.card__element').remove();
}

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
trashButton.addEventListener('click', deleteCard);
