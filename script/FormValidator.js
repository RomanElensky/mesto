export class FormValidator {
  constructor(formItem, formPopup) {
    this._formPopup = formPopup;
    this._formElement = formItem.formElement;
    this._inputElement = formItem.inputElement;
    this._buttonElemnt = formItem.buttonElemnt;
    this._buttonElemntDisabled = formItem.buttonElemntDisabled;
    this._inputErrorElement = formItem.inputErrorElement;
    this._spanErrorElement = formItem.spanErrorElement;
    this._submitButtonElement = this._formPopup.querySelector(this._buttonElemnt);
    this._inputFormActive = Array.from(this._formPopup.querySelectorAll(this._inputElement));
  }

  _showInputError(inputItem) {
    const errorElement = this._formPopup.querySelector(`.${inputItem.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.add(this._spanErrorElement);
    errorElement.textContent = inputItem.validationMessage;
  }

  _hideInputError(inputItem) {
    const errorElement = this._formPopup.querySelector(`.${inputItem.id}-error`);
    errorElement.classList.remove(this._spanErrorElement);
    errorElement.textContent = '';
  }

  _activationButtonSave() {
    this._submitButtonElement.removeAttribute('disabled');
    this._submitButtonElement.classList.remove(this._buttonElemntDisabled);
  }

  _deactivateButtonSave() {
    this._submitButtonElement.setAttribute('disabled', true);
    this._submitButtonElement.classList.add(this._buttonElemntDisabled);
  }

  _checkInput() {
    return this._inputFormActive.some(inputItem => {
      return !inputItem.validity.valid;
    })
  }

  _toggleButtonState() {
    const formValid = this._checkInput();
    if (!formValid) {
      this._activationButtonSave();
    } else {
      this._deactivateButtonSave();
    }
  }

  _checkInputValidity(inputItem) {
    if (!inputItem.validity.valid) {
      inputItem.classList.add(this._inputErrorElement);
      this._showInputError(inputItem);
    } else {
      inputItem.classList.remove(this._inputErrorElement);
      this._hideInputError(inputItem);
    }
    this._toggleButtonState();
  }
  
  _setEventListeners(inputItem) {
    inputItem.addEventListener('input', () => {
      this._checkInputValidity(inputItem);
    });
  }

  resetValidation() {
    this._inputFormActive.forEach(inputItem => {
      inputItem.classList.remove(this._inputErrorElement);
      this._hideInputError(inputItem);
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._inputFormActive.forEach(inputItem => {
      this._setEventListeners(inputItem);
    });
  }
}
