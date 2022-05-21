export default class Api {
    constructor(headers, userID) {
        this._headers = headers;
        this._userID = userID;
    }

    getInfo() {
        return this._sendRequest(fetch(`https://nomoreparties.co/v1/${this._userID}/users/me`, {
            method: 'GET',
            headers: this._headers
        }));
    }

    patchInfo(info) {
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${this._userID}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.profile_name,
                about: info.profile_info
            })
        }))
    }

    patchAvatar(avatarInfo) {
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${this._userID}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarInfo.form_avatar
            })
        }))
    }

    getCards() {
        return this._sendRequest(
            fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
            method: 'GET',
            headers: this._headers
        }))
    }

    postCard(cardInfo) {
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${this._userID}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardInfo.card_name,
                link: cardInfo.card_info
            })
        }))
    }

    deleteCard(id) {
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${this._userID}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }))
    }

    likeCard(groupId, id) {
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${groupId}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        }))
    }

    unlikeCard(groupId, id) {
        return this._sendRequest(fetch(`https://mesto.nomoreparties.co/v1/${groupId}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }))
    }


    _sendRequest(promise) {
        return promise
            .then((res) => {
                if (res.ok){
                    return res.json()
                }
                Promise.reject(`Ошибка ${res.status}`);
            })
            .then((res) => {
                return res
            })
    }
}