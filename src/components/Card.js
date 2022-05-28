export class Card {
  constructor({ name, link, handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector, cardOwner, myData, likes = [], cardId) {
    this._name = name;
    this._image = link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._cardOwner = cardOwner;
    this._myData = myData;
    this._likes = likes;
    this._cardId = cardId;
  }

  _getTemplate() {
    const card = document.querySelector(this._cardSelector).content;
    const cardElement = card.querySelector('.card__element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.card__image');
    this._cardName = this._card.querySelector('.card__name');
    this._cardLike = this._card.querySelector('.card__like');
    this._cardLikes = this._card.querySelector('.card__like-amount');
    this._cardTrash = this._card.querySelector('.card__trash-button');
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._setEventListeners();
    this.defaultLikes();
    return this._card;
  }

  removeCard() {
    this._card.remove();
  }

  defaultLikes() {
    this._cardLikes.textContent = this._likes.length
    if (this._likes.some((likes) => likes._id === this._myData._id)) {
      this._cardLike.classList.add('card__like_clicked');
    } else {
      this._cardLike.classList.remove('card__like_clicked');
    }
  }

  likeCard() {
    this._cardLike.classList.add('card__like_clicked');
    this._cardLikes.textContent = this._likes.length;
  }

  unlikeCard() {
    this._cardLike.classList.remove('card__like_clicked');
    this._cardLikes.textContent = this._likes.length;
  }

  _setEventListeners() {
    if (this._cardOwner._id === this._myData._id) {
      this._cardTrash.classList.add('card__trash-button_active');
      this._cardTrash.addEventListener('click', () => {
        this._handleDeleteClick(this._cardId, this._card);
      });
    }

    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._likes)
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link
      })
    })
  }
}