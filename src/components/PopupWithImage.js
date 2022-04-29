import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._popupImage = document.querySelector('.popup__image');
        this._popupTitle = document.querySelector('.popup__image-title');
    }

    open(link, name) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupTitle.textContent = name;
        super.open();
    }
} 