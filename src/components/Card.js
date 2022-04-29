export class Card {
  constructor({ name, link, handleCardClick }, cardSelector) {
      this._name = name;
      this._image  = link;
      this._handleCardClick = handleCardClick;
      this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.querySelector('.card__element').cloneNode(true)
    return cardElement
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.card__image');
    this._card.querySelector('.card__name').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
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

      this._cardImage.addEventListener('click', () => {
        this._handleCardClick({
          name: this._name,
          link: this._link
      })
      })
  }
}