export default class Popup {
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close-button');
        this._closePopupESCEvent = this._closePopupESCEvent.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupESCEvent);
    }
    
    close() {
        this._popupElement.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupESCEvent);
    }

    _closePopupESCEvent(evt){
        if (evt.key === 'Escape'){
            this.close();
        }
    }

    setEventListeners(){
        this._closeButton.addEventListener('click', () => this.close());
    }
}