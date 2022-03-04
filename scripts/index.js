import {FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";


import{
  postList,
  popupPreview,
  popupProfile,
  popupAdd,
  popupProfileOpenButton,
  popupAddNewPlaceButton,
  popupCloseButton,
  popupAddCloseButton,
  popupPreviewCLoseButton,
  cardTemplateSelector,
  formValidation,
  initialCards
} from "./Constants.js";

import {
  openPopup,
  closePopup,
  clearErrorMessage
} from "./Utils.js"

function createCard(item){
  const card = new Card(item, cardTemplateSelector);
  const cardElement = card.makeCard();
  return cardElement;
}

function renderCard(data) {
  const cardElement = createCard(data)
  postList.prepend(cardElement);
}

initialCards.forEach(renderCard);


//Обработчики кнопок 
//Открытие
popupProfileOpenButton.addEventListener("click", () => {
  copyProfileData();
  openPopup(popupProfile);
  clearErrorMessage();
  const editFormResetValidation = new FormValidator(formValidation, popupProfile);
  editFormResetValidation.resetValidation();
});

popupAddNewPlaceButton.addEventListener("click", () => {
  openPopup(popupAdd);
  clearErrorMessage()
  const addCardFormResetValidation = new FormValidator(formValidation, popupAdd);
  addCardFormResetValidation.resetValidation()
});

//Закрытие
popupCloseButton.addEventListener("click", () => {
  closePopup(popupProfile);
});

popupAddCloseButton.addEventListener("click", () => {
  closePopup(popupAdd);
});

popupPreviewCLoseButton.addEventListener("click", () => {
  closePopup(popupPreview);
});



//!Кнопка сохранения информации профиля

//Текст в профиле
import {profileName, profileJob} from "./Constants.js"

//Форма в Popup'е
const popupProfileForm = document.querySelector(".popup__form-profile");

//Поля формы
import {popupProfileName, popupProfileJob} from "./Constants.js"

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileJob.textContent = popupProfileJob.value;
  closePopup(popupProfile);
};

popupProfileForm.addEventListener('submit', changeProfile);

//Копирование данных из профиля в Popup
function copyProfileData() {
  popupProfileName.value = profileName.textContent;
  popupProfileJob.value = profileJob.textContent;
};

//Форма добавления новой карточки
import {addForm} from "./Constants.js"

//Поля формы и кнопка добавления добавления 
import {addFormName, addFormLink, addNewPostButton} from "./Constants.js"



function addNewPlace(event) {
  event.preventDefault();
  
  renderCard({
    name: addFormName.value,
    link: addFormLink.value
  });

  closePopup(popupAdd);


  addForm.reset();
};





addForm.addEventListener("submit", addNewPlace);


const editFormValidation = new FormValidator(formValidation, popupProfileForm);
const addCardFormValidation = new FormValidator(formValidation, addForm);


editFormValidation.enableValidation();
addCardFormValidation.enableValidation();


