import { openImage } from './utils.js';

export class Card {
    constructor(cardInfo, cardTemplate) {
        this._cardTemplate = cardTemplate;
        this._name = cardInfo.name;
        this._link = cardInfo.link;
    }

    _getTemplate() {
      const cardElement = this._cardTemplate.querySelector('.card__element').cloneNode(true)
      return cardElement
    }

    generateCard() {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.card__image');
        this._setEventListeners();
        this._card.querySelector('.card__name').textContent = this._name;
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        return this._card;
    }

    removeCard() {
      this._card.remove();
    }

    handleLikeClick() {
      this._card.querySelector('.card__like').classList.toggle('card__like_clicked');
    }

    _setEventListeners() {
        this._card.querySelector('.card__trash-button').addEventListener('click', () => {
          this.removeCard();
        });

        this._card.querySelector('.card__like').addEventListener('click', () => {
          this.handleLikeClick();
        });

        this._cardImage.addEventListener('click', () => {
            openImage(this._link, this._name);
        })
    }
}