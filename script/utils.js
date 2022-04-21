const popupOpenImage = document.querySelector('.popup_type_image');
const popupImage = popupOpenImage.querySelector('.popup__image');

export function openImage(imageLink, imageName) {
    popupImage.src = imageLink
    popupImage.alt = imageName
    popupImage.textContent = imageName
    openPopup(popupOpenImage)
}