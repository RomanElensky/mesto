const popupOpenImage = document.querySelector('.popup_type_image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupTitleImage = popupOpenImage.querySelector('.popup__image-title');

export function openImage(imageLink, imageName) {
    popupImage.src = imageLink;
    popupImage.alt = imageName;
    popupTitleImage.textContent = imageName;
    openPopup(popupOpenImage) 
}

export function openPopup(popups) {
    popups.classList.add('popup_opened');
    closePopupESCEvent();
}

export function closePopup(popups) {
    popups.classList.remove('popup_opened');
    closePopupESCRemoveEvent();
}

function closePopupESCEvent() {
    document.addEventListener('keydown', closePopupESC);
}

function closePopupESCRemoveEvent() {
    document.removeEventListener('keydown', closePopupESC);
}

function closePopupESC (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}