export class Card {
  constructor({ name, link, handleCardClick }, cardSelector) {
      this._name = name;
      this._image  = link;
      this._handleCardClick = handleCardClick;
      this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const card = document.querySelector(this._cardSelector).content;
    const cardElement = card.querySelector('.card__element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    const cardImage = this._card.querySelector('.card__image');
    const cardName = this._card.querySelector('.card__name');
    cardImage.src = this._image;
    cardImage.alt = this._name;
    cardName.textContent = this._name;
    this._setEventListeners();
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

      this._card.querySelector('.card__image').addEventListener('click', () => {
        this._handleCardClick({
            name: this._name,
            link: this._link
        })
      })
  }
}