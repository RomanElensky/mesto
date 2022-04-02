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
function renderInitialCards () {
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

renderInitialCards ()