import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ handleSubmit }, popupSelector) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__input-container');
        this._inputsList = Array.from(this._formElement.querySelectorAll('.popup__input'));
        this._handleSubmit = handleSubmit;
    }

    _getInputValues() {
        const inputsValues = {};
        this._inputsList.forEach((input) => {
            inputsValues[input.name] = input.value;
        })
        return inputsValues;
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }
}