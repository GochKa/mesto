import {openPopup} from "./Utils.js"
import { 
  popupPreview,
  popupPreviewImg,
  popupPreviewTitle 
} from "./Constants.js";

export class Card {
  constructor(data,cardTemplateSelector, handlePopupImg) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(cardTemplateSelector).content;
    this._handlePopupImg = handlePopupImg;
  }

  _postTempLikeButtonHandler(evt) {
    const like = evt.target;
    like.classList.toggle("post-list__like_active");
  };

  _postTempDelButtonHandler(evt) {
    const deleat = evt.target;
    deleat.closest(".post-list__item").remove();
  };


  
  _setEventListeners(){
    this._postTempLikeButton.addEventListener("click", this._postTempLikeButtonHandler);
    this._postTempDelButton.addEventListener("click", this._postTempDelButtonHandler);

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
    return this._postItemTemp;
  }

}