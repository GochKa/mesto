export class Card {
  constructor(data, cardTemplateSelector, handlePopupImg, handleDeleatClick, handleLikeClick) {

    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;

    this._userID = data.userID;
    this._ownerID = data.ownerID


    this._template = document.querySelector(cardTemplateSelector).content;
    this._handlePopupImg = handlePopupImg;
    this._handleDeleatClick = handleDeleatClick
    this._handleLikeClick = handleLikeClick;
  }



 

  deleatCard() {
    this._postTempDelButton
      .closest(".post-list__item").remove();
  };

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userID);

    return userHasLikedCard
  }

  setLikes(newLikes) {
    
    this._likes = newLikes;
  
    this._likeCounter.textContent = this._likes.length

    if (this.isLiked()) {

      this._likeAdd();
    } else {
      this._likeRemove();
    }
  }

  _likeAdd(){
    this._postTempLikeButton.classList.add("post-list__like_active");
  }

  _likeRemove(){
    this._postTempLikeButton.classList.remove("post-list__like_active");
  }

  _setEventListeners() {


    this._postTempLikeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id)
    });
    this._postTempDelButton.addEventListener("click", () => {
      this._handleDeleatClick(this._id)
    });

    this._postTempImg.addEventListener("click", () => this._handlePopupImg());



  }






  makeCard() {


    this._postItemTemp = this._template.cloneNode(true);
    this._postTempImg = this._postItemTemp.querySelector(".post-list__photo");
    this._postTempTitle = this._postItemTemp.querySelector(".post-list__title");
    this._postTempDelButton = this._postItemTemp.querySelector(".button-card-delete");
    this._postTempLikeButton = this._postItemTemp.querySelector(".post-list__like");
    this._likeCounter = this._postItemTemp.querySelector(".like-counter");



    this._postTempImg.src = this._link;
    this._postTempTitle.textContent = this._name;
    this._postTempImg.alt = this._name;



    if (this._ownerID !== this._userID) {
      this._postTempDelButton.style.display = "none"
    }

    this.setLikes(this._likes)



    this._setEventListeners();


    return this._postItemTemp;
  }

}