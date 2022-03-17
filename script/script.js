const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
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
    renderCard({ name: inputCard.value, link: inputLink.value });
    closePopup(popupAddCard);
}

popupCloseButton.forEach(function(item) {
    const activeClose = item.closest('.popup');
    item.addEventListener('click', function() {
        closePopup(activeClose);
    });
});

// Cards function
function newCards () {
    initialCards.forEach(renderCard);
}

function createCard(item) {
    const cardElement = cardTemplate.querySelector('.card__element').cloneNode(true);
    const viewImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__name').textContent = item.name;
    viewImage.src = item.link;
    viewImage.alt = item.name;

    // Like function
    cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle("card__like_clicked")});

    // Remove cards function
    cardElement.querySelector('.card__trash-button').addEventListener('click', (evt) => {
        evt.target.closest('.card__element').remove()});
        
    // View image
        viewImage.addEventListener('click', () => openImage(viewImage));

    return cardElement;
}

function renderCard(item) {
    const cardElement = createCard(item)
    cardSection.prepend(cardElement);
}

// View images function
function openImage(viewImage) {
    popupImage.src = viewImage.src
    popupImage.alt = viewImage.alt
    popupImageTitle.textContent = viewImage.alt
    openPopup(popupOpenImage)
}

profileEditButton.addEventListener('click', popupOpenEditForm);
profileAddButton.addEventListener('click', popupOpenAddCard);
popupEditProfile.addEventListener('submit', formSubmitHandler);
popupAddCard.addEventListener('submit', formSubmitCard);

newCards ()