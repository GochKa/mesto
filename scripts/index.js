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



function renderCard(data) {
  const card = new Card(data, cardTemplateSelector);
  const cardElement = card.createCard();
  postList.prepend(cardElement);
}

initialCards.forEach(renderCard);


//Обработчики кнопок 
//Открытие
const submitProfileButton = document.querySelector(".button-profile-submit");
popupProfileOpenButton.addEventListener("click", () => {
  copyPopup();
  openPopup(popupProfile);
  submitProfileButton.removeAttribute("disabled");
  submitProfileButton.classList.remove("popup__add_disabled");
});

popupAddNewPlaceButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

//Закрытие
popupCloseButton.addEventListener("click", () => {
  closePopup(popupProfile);
  clearErrorMessage()
});

popupAddCloseButton.addEventListener("click", () => {
  closePopup(popupAdd);
  clearErrorMessage()
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
function copyPopup() {
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
  clearErrorMessage();
  addNewPostButton.setAttribute("disabled", "true");
  addNewPostButton.classList.add("popup__add_disabled");

  addFormName.value = "";
  addFormLink.value = "";
};





addForm.addEventListener("submit", addNewPlace);


const editFormValidation = new FormValidator(formValidation, popupProfileForm);
const addCardFormValidation = new FormValidator(formValidation, addForm);


editFormValidation.enableValidation();
addCardFormValidation.enableValidation();