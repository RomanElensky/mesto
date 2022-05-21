export class Card {
  constructor({ name, link, handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector, cardOwner, myData, likes =[], cardId) {
      this._name = name;
      this._image  = link;
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
    const cardImage = this._card.querySelector('.card__image');
    const cardName = this._card.querySelector('.card__name');
    this._cardLike = this._card.querySelector('.card__like');
    this._cardLikes = this._card.querySelector('.element__like-amount');
    cardImage.src = this._image;
    cardImage.alt = this._name;
    cardName.textContent = this._name;
    this._setEventListeners();
    this._defaultLikes();
    return this._card;
  }

  removeCard() {
    this._card.remove();
  }

  _defaultLikes() {
    this._cardLikes.textContent = this._likes.length;
    if (this._likes.some((likes) => likes._id === this._myData._id)) {
        this._cardLike.classList.add('card__like_clicked');
    }
  }

  likeCard(cardInfo) {
    this._cardLike.classList.add('card__like_clicked');
    this._cardLikes.textContent = cardInfo.likes.length;
  }

  unlikeCard(cardInfo) {
    this._cardLike.classList.remove('card__like_clicked');
    this._cardLikes.textContent = cardInfo.likes.length;
  }

  handleLikeClick(evt) {
    evt.target.classList.toggle('card__like_clicked');
  }

  _setEventListeners() {
    if (this._cardOwner._id === this._myData._id) {
      this._card.querySelector('.card__trash-button').classList.add('card__trash-button_active');
      this._card.querySelector('.card__trash-button').addEventListener('click', () => {
        this._handleDeleteClick(this._cardId, this._card);
      });
    }

      this._card.querySelector('.card__like').addEventListener('click', () => {
        this._handleLikeClick(this._cardId, this._likes)
      });

      this._card.querySelector('.card__image').addEventListener('click', () => {
        this._handleCardClick({
            name: this._name,
            link: this._link
        })
      })
  }
}