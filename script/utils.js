export function openImage(imageLink, imageName) {
    popupImage.src = imageLink
    popupImage.alt = imageName
    popupImage.textContent = imageName
    openPopup(popupOpenImage)
}