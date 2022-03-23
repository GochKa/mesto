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
  popupProfileOpenButton,
  popupAddNewPlaceButton,
  cardTemplateSelector,
  formValidation,
  changeAvatarButton,
  popupProfileName,
  popupProfileJob,
  changeAvatarForm,
  editForm,
  addForm
} from "../utils/constants.js";

import {
  api
} from "../components/Api.js"
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";

let userId

//Данные профиля
const userInfo = new UserInfo({
  profileNameSelector: ".profile__info-title",
  profileJobSelector: ".profile__info-subtitle",
  avatarSelector: ".profile__avatar"
});
/////////////////////////

//Получение данных
Promise.all([api.getProfile(), api.getInitialCards()])
.then(([res, section]) =>{
  userInfo.setUserInfo(res)
  userId= res._id
  section.forEach(data =>{
    createCard(data, undefined, cardSet)
  })
})
.catch(console.log);
/////////////////////

//Модалка превью карточки
const popupPreviewModal = new PopupWithImag(".preview-popup")
////////////////////////
//Модалка подвтерждения удаления
const confirmModal = new PopupWithConfirm(".deleat-submit-popup");
//////////////////////////

//Отрисовка карточек на странице
const cardSet = new Section({
  items:[],
  renderer: (data) =>{
    createCard(data, cardTemplateSelector, cardSet)
  }
}, ".post-list")
////////////////////////////////

//Модалка добавления карточки на страницу
const addCardPopup = new PopupWithForm(".add-popup", (data) =>{
    addCardPopup.renderLoading(true);
    api.addCard(data.Place, data.Link)
    .then((res)=>{
      createCard(res, cardTemplateSelector, cardSet)
      addCardPopup.close()
    })
    .catch(console.log)
    .finally(() =>{
      addCardPopup.renderLoading(false)
    })
  }
);
///////////////////////////////////////////

//Модалка изменения данных профиля
const profileEditPopup = new PopupWithForm(".profile-popup", (data) =>{
    profileEditPopup.renderLoading(true);
    api.editProfile(data.First_name, data.Profession)
    .then((res) =>{
      userInfo.setUserInfo(res)
      profileEditPopup.close()
    })
    .catch(console.log)
    .finally(() =>{
      profileEditPopup.renderLoading(false)
    })
  }
);
///////////////////////////////////////

//Модалка изменения аватара профиля
const avatarChangePopup = new PopupWithForm(".change-avatar-popup", (data) =>{
    const {avatar} = data
    avatarChangePopup.renderLoading(true);
    api.updateAvatar(avatar)
    .then((res) =>{
      userInfo.setNewAvatar(res)
      avatarChangePopup.close()
    })
    .catch(console.log)
    .finally(() =>{
      avatarChangePopup.renderLoading(false)
    })
  }
);
//////////////////////////////////////

//Отрисовка карточек на странице
function createCard(data, undefined, cardSet){
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      _id: data._id,
      userId: userId,
      owner: data.owner
    },
    cardTemplateSelector,
    {handlePopupImg: () => popupPreviewModal.open(data.name, data.link)},
    (id) =>{
      confirmModal.open();
      confirmModal.setFormSubmitHandler(() =>{
        api.deleatCard(id)
          .then(() =>{
            card.deleatCard();
            confirmModal.close();
          })
          .catch(console.log)
      })
    },
    (id) =>{
      if(card.isLiked()){
        api.deleatLike(id)
        .then((res) =>{
          card.setLikes(res.likes)
        })
        .catch(console.log)
      } else {
        api.addLike(id)
        .then((res) =>{
          card.setLikes(res.likes)
        })
        .catch(console.log)
      }
    });
    const newCard = card.makeCard()
    cardSet.addCard(newCard);
}
/////////////////////////////

//Валидация форм 
const avatarChangePopupValidator = new FormValidator(formValidation, changeAvatarForm)
const profileEditPopupValidator = new FormValidator(formValidation, editForm)
const addCardPopupValidator = new FormValidator(formValidation, addForm)

avatarChangePopupValidator.enableValidation()
profileEditPopupValidator.enableValidation() 
addCardPopupValidator.enableValidation()
/////////////////////////////

//Слушатели событий 
avatarChangePopup.setEventListeners();
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
popupPreviewModal.setEventListeners(); 
confirmModal.setEventListeners();

  //Кнопка изменения аватара
changeAvatarButton.addEventListener("click",() => {
  avatarChangePopupValidator.resetValidation();
  avatarChangePopup.open();
});

  //Кнопка изменения информации профиля
popupProfileOpenButton.addEventListener("click", () =>{
  profileEditPopup.open() 
  const data = userInfo.getUserInfo();

  popupProfileName.value = data.name;
  popupProfileJob.value = data.job;
});  

  //Кнопка добавления новой карточки
popupAddNewPlaceButton.addEventListener("click", () =>{
  addCardPopupValidator.resetValidation();
  addCardPopup.open();
})  