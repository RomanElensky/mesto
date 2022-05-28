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

  _activationButtonSave() {
    this.submitButtonElement.removeAttribute('disabled');
    this.submitButtonElement.classList.remove(this._buttonElemntDisabled);
  }

  deactivateButtonSave() {
    this.submitButtonElement.setAttribute('disabled', true);
    this.submitButtonElement.classList.add(this._buttonElemntDisabled);
  }

  _checkInput() {
    return this.inputList.some(inputItem => {
      return !inputItem.validity.valid;
    })
  }

  toggleButtonState() {
    if (this._checkInput()) {
      this.submitButtonElement.classList.add(this._buttonElemntDisabled);
      this.submitButtonElement.disabled = true;
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
    this.inputList = Array.from(this._formPopup.querySelectorAll(this._inputElement));
    this.toggleButtonState();

    this.inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this.toggleButtonState();
      })
    })
  }

  resetValidation() {
    this.inputList.forEach(inputItem => {
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
