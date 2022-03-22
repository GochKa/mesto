import {
  FormValidator
} from "../components/FormValidator.js";
import {
  Card
} from "../components/Card.js";

import {
  Section
} from "../components/Section.js";
import {
  PopupWithImag
} from "../components/PopupWithImag.js";
import {
  PopupWithForm
} from "../components/PopupWithForm.js";
import {
  UserInfo
} from "../components/UserInfo.js";


import '../pages/index.css'

import {
  postList,
  popupProfileOpenButton,
  popupAddNewPlaceButton,
  cardTemplateSelector,
  formValidation,
  initialCards,
  changeAvatarButton,
} from "../utils/constants.js";

import {
  api
} from "../components/Api.js"

let userID
//Получение даных профиля 
api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res)
    userID = res._id
  })

//Отрисовка страницы  
api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const card = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        _id: data._id,
        userID: userID,
        ownerID: data.owner._id
      })
      section.addCard(card);
    })
  })

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
import {
  popupProfileName,
  popupProfileJob,
  addForm
} from "../utils/constants.js"

//Копирование данных из профиля в Popup
function copyProfileData() {
  const data = userInfo.getUserInfo();

  popupProfileName.value = data.name;
  popupProfileJob.value = data.job;
};
//Информация пользователя



//Создание карточек
const section = new Section({
  items: initialCards,
  renderer: renderCard
}, ".post-list")
section.renderCard();


function createCard(item) {
  const card = new Card(
    item,
    cardTemplateSelector,
    () => {
      popupPreviewModal.open(item.name, item.link)
    },
    (id) => {
      confirmModal.open();
      confirmModal.changeSubmitHandler(() => {
        api.deleatCard(id).then(() => {
          card.deleatCard();
          confirmModal.close();
        })
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.deleatLike(id)
          .then(res => {
            card.setLikes(res.likes)
            
          })
      } else {

        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })

      }
    }
  );
  const cardElement = card.makeCard();
  return cardElement;
}

function renderCard(data) {
  const cardElement = createCard(data)
  postList.append(cardElement);
}
////////////////////////////////////

//Превью
const popupPreviewModal = new PopupWithImag(".preview-popup")
popupPreviewModal.setEventListeners()
////////////////////////////////////

//Формы изменения информации профиля
const profilePopup = new PopupWithForm(".profile-popup", (data) =>{
  profilePopup.renderLoading(true)
  api.editProfile(data.First_name, data.Profession)
  .then((res) => {
    userInfo.setUserInfo(res);
    profilePopup.close();
  }).finally(() =>{
    profilePopup.renderLoading(false)
  })
});


//Форма добавления новой карточки
const addCardPopup = new PopupWithForm(".add-popup", (data) =>{
  addCardPopup.renderLoading(true)
  api.addCard(data.Place, data.Link)
    .then(res => {

      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        _id: res._id,
        userID: userID,
        ownerID: res.owner._id
      })
      section.addCard(card);

      addCardPopup.close();
    })
    .finally(() =>{
      addCardPopup.renderLoading(false)
    })
});

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
////////////////////////////////////

//Валидация форм
const editFormValidation = new FormValidator(formValidation, popupProfileForm);
const addCardFormValidation = new FormValidator(formValidation, addForm);


editFormValidation.enableValidation();
addCardFormValidation.enableValidation();
////////////////////////////////////



//Confirm удаления карточки
const confirmModal = new PopupWithForm(".deleat-submit-popup");
confirmModal.setEventListeners();
////////////////////////////////////


//Изменение аватара
const changeAvatar = new PopupWithForm(".change-avatar-popup", (data) =>{
  newAvatarFormValidator.enableValidation()
  const {avatar} = data
  changeAvatar.renderLoading(true)
  api.updateAvatar(avatar)
  .then((res) =>{
    console.log("res =>", res)
    userInfo.setNewAvatar(res)
    changeAvatar.close()
  })
  .finally(() =>{
    changeAvatar.renderLoading(false);
  })
})




const newAvatarForm = document.querySelector(".change-avatar-form");
const newAvatarFormValidator = new FormValidator(formValidation, newAvatarForm);
newAvatarFormValidator.enableValidation()
console.log(newAvatarForm)

changeAvatar.setEventListeners()
changeAvatarButton.addEventListener("click", ()=>{
  newAvatarFormValidator.resetValidation()
  changeAvatar.open()
})
///////////////////



//Данные профиля
const userInfo = new UserInfo({
  profileNameSelector: ".profile__info-title",
  profileJobSelector: ".profile__info-subtitle",
  avatarSelector: ".profile__avatar"
});
/////////////////////////