export class FormValidator {
  constructor(formElement, formPopup) {
    this._formPopup = formPopup;
    this._errorClass = formElement.errorClass;
    this._formSelector = formElement.formSelector;
    this._inputSelector = formElement.inputSelector;
    this._inactiveButtonClass = formElement.inactiveButtonClass;
    this._buttonElemnt = formElement.buttonElemnt;
    this._inputErrorClass = formElement.inputErrorClass;
    this._submitButtonElement = this._formPopup.querySelector(this._buttonElemnt)
    this._inputFormActive = Array.from(this._formPopup.querySelectorAll(this._inputSelector));
  }

  _showInputError(inputElement) {
    const errorElement = this._formPopup.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.vvalidationMessage;
  }

  _hideInputError = (inputElement) => {
    const spanErrorElement = this._formPopup.querySelector(`.${inputElement.id}-error`);
    spanErrorElement.classList.remove(this._errorClass);
  };

  _activationButtonSave() {
    this._submitButtonElement.removeAttribute('disabled');
    this._submitButtonElement.classList.remove(this._inactiveButtonClass);
  }

  _deactivateButtonSave() {
    this._submitButtonElement.setAttribute('disabled', true);
    this._submitButtonElement.classList.add(this._inactiveButtonClass);
  }

  _checkInput() {
    return this._inputFormActive.some(inputElement => {
      return !inputElement.validity.valid;
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

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      this._showInputError(inputElement);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      this._hideInputError(inputElement);
    }
    this._toggleButtonState();
  }
  
  _setEventListeners(inputElement) {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
    });
  }

  resetValidation() {
    this._inputFormActive.forEach(inputElement => {
      inputElement.classList.remove(this._inputErrorClass);
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._inputFormActive.forEach(inputElement => {
      this._setEventListeners(inputElement);
    });
  }
}
