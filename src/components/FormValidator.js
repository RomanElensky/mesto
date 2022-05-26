import { submitProfileButton } from "../utils/constants.js";

export class FormValidator {
  constructor(formItem, formPopup) {
    this._formPopup = formPopup;
    this._formElement = formItem.formElement;
    this._inputElement = formItem.inputElement;
    this._buttonElemnt = formItem.buttonElemnt;
    this._buttonElemntDisabled = formItem.buttonElemntDisabled;
    this._inputErrorElement = formItem.inputErrorElement;
    this._spanErrorElement = formItem.spanErrorElement;
  }

  _showInputError(inputItem, errorMessage) {
    const errorElement = this._formPopup.querySelector(`.${inputItem.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._spanErrorElement);
    inputItem.classList.add(this._inputErrorElement);
  }

  _hideInputError = (inputItem) => {
    const errorElement = this._formPopup.querySelector(`.${inputItem.id}-error`);
    errorElement.classList.remove(this._spanErrorElement);
    inputItem.classList.remove(this._inputErrorElement);
    errorElement.textContent = '';
  }

  deactivateButtonSave() {
    submitProfileButton.setAttribute('disabled', true);
    submitProfileButton.classList.add(this._buttonElemntDisabled);
  }

  _checkInput() {
    return this.inputFormActive.some(inputItem => {
      return !inputItem.validity.valid;
    })
  }

  toggleButtonState() {
    if (this._checkInput()) {
      this.submitButtonElement.classList.add(this._buttonElemntDisabled);
      this.submitButtonElement.disabled = true;
      this.deactivateButtonSave();
    }
    else {
      this.submitButtonElement.classList.remove(this._buttonElemntDisabled);
      this.submitButtonElement.disabled = false;
    }
    }

  _checkInputValidity(inputItem) {
    if (!inputItem.validity.valid) {
      this._showInputError(inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(inputItem);
    }
  }
  
  _setEventListeners() {
    this.submitButtonElement = this._formPopup.querySelector(this._buttonElemnt);
    this.inputFormActive = Array.from(this._formPopup.querySelectorAll(this._inputElement));
    this.toggleButtonState();

    this.inputFormActive.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this.toggleButtonState();
      })
    })
  }

  resetValidation() {
    this.inputFormActive.forEach(inputItem => {
      this._hideInputError(inputItem);
    });
    this.toggleButtonState();
  }

  enableValidation() {
    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    this._setEventListeners();
  }
}
