import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor({ handleSubmit }, popupSelector) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._cardId = null;
        this._cardElement = null;
        this._buttonSubmit = this._popupElement.querySelector('.popup__submit-button')
    }

    cardId(id, cardElement) {
        this._cardId = id;
        this._cardElement = cardElement;
        return id;
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonSubmit.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._cardId, this._cardElement);
        })
    }
}
