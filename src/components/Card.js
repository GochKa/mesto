export class Card {
  constructor(data,cardTemplateSelector, handlePopupImg, handleDeleatClick) {
    this._data = data;
    
    this._name = data.name;
    this._link = data.link;
    this._likes = ".like-counter"


    
    this._template = document.querySelector(cardTemplateSelector).content;
    this._handlePopupImg = handlePopupImg;
    this._handleDeleatClick = handleDeleatClick
  }

  _postTempLikeButtonHandler(evt) {
    const like = evt.target;
    like.classList.toggle("post-list__like_active");
  };

  //_postTempDelButtonHandler(evt) {
   // const deleat = evt.target;
   // deleat.closest(".post-list__item").remove();
  //};

  _setLikes(){
    const likeCountElement = this._postItemTemp.querySelector(this._likes);
    likeCountElement.textContent = this._likes.length;
  }

  
  _setEventListeners(){
    this._postTempLikeButton.addEventListener("click", this._postTempLikeButtonHandler);
    this._postTempDelButton.addEventListener("click", () => this._handleDeleatClick());

    this._postTempImg.addEventListener("click",()=> this._handlePopupImg());
  }



  makeCard() {
    this._postItemTemp = this._template.cloneNode(true);
    this._postTempImg = this._postItemTemp.querySelector(".post-list__photo");
    this._postTempTitle = this._postItemTemp.querySelector(".post-list__title");
    this._postTempDelButton = this._postItemTemp.querySelector(".button-card-delete");
    this._postTempLikeButton = this._postItemTemp.querySelector(".post-list__like");





    this._postTempImg.src = this._link;
    this._postTempTitle.textContent = this._name;
    this._postTempImg.alt = this._name;

    

    this._setEventListeners();
    this._setLikes()
    return this._postItemTemp;
  }

}