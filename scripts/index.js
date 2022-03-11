import {FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";

import { Section } from "./Section.js";
import { PopupWithImag } from "./PopupWithImag.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";


import{
  postList,
  popupProfile,
  popupAdd,
  popupProfileOpenButton,
  popupAddNewPlaceButton,
  popupPreviewCLoseButton,
  popupCloseButton,
  popupAddCloseButton,
  cardTemplateSelector,
  formValidation,
  initialCards
} from "./Constants.js";

import {
  openPopup,
  closePopup,
} from "./Utils.js"





//Обработчики кнопок 
//Открытие
popupProfileOpenButton.addEventListener("click", () => {
  copyProfileData();
  profilePopup.open()
  editFormValidation.resetValidation();
});

popupAddNewPlaceButton.addEventListener("click", () => {
  addCardPopup.open()
  addCardFormValidation.resetValidation()
});


//Форма в Popup'е
const popupProfileForm = document.querySelector(".popup__form-profile");

//Поля формы
import {popupProfileName, popupProfileJob} from "./Constants.js"

const changeProfile = (data) =>{
  const {First_name, Profession} = data
  userInfo.setUserInfo(First_name, Profession);

  profilePopup.close();
};



//Копирование данных из профиля в Popup
function copyProfileData() {
  const data = userInfo.getUserInfo();
  
  popupProfileName.value = data.name;
  popupProfileJob.value = data.job;
};

//Форма добавления новой карточки
import {addForm} from "./Constants.js"




const editFormValidation = new FormValidator(formValidation, popupProfileForm);
const addCardFormValidation = new FormValidator(formValidation, addForm);


editFormValidation.enableValidation();
addCardFormValidation.enableValidation();




const addNewPlace = (data) => {
  
  console.log("data", data)
  const card = createCard({
    name: data.Place,
    link: data.Link
  })
  section.addCard(card);

  addCardPopup.close();



};

//Превью
const popupPreviewModal = new PopupWithImag(".preview-popup")
popupPreviewModal.setEventListeners()


//Формы профиля и добавления карточки
const profilePopup = new PopupWithForm (".profile-popup", changeProfile);
const addCardPopup = new PopupWithForm (".add-popup", addNewPlace);

profilePopup.setEventListeners();
addCardPopup.setEventListeners();




//Создание карточек
const section = new Section({items: initialCards, renderer: renderCard}, ".post-list")
section.renderCard();


function createCard(item){
  const card = new Card(item, cardTemplateSelector, ()=>{
    popupPreviewModal.open(item.name,item.link)
  });
  const cardElement = card.makeCard();
  return cardElement;
}

function renderCard(data) {
  const cardElement = createCard(data)
  postList.prepend(cardElement);
}


//Информация пользователя

const userInfo = new UserInfo({profileNameSelector: ".profile__info-title", profileJobSelector:".profile__info-subtitle"});

