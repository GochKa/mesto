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
  initialCards
} from "../utils/constants.js";

import {
  api
} from "../components/Api.js"

let userID

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)

    userID = res._id
  })

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

const changeProfile = (data) => {
  const {
    First_name,
    Profession
  } = data

  api.editProfile(First_name, Profession)
    .then(() => {
      userInfo.setUserInfo(First_name, Profession);
      profilePopup.close();
    })


};



//Копирование данных из профиля в Popup
function copyProfileData() {
  const data = userInfo.getUserInfo();

  popupProfileName.value = data.name;
  popupProfileJob.value = data.job;
};
//Информация пользователя
const userInfo = new UserInfo({
  profileNameSelector: ".profile__info-title",
  profileJobSelector: ".profile__info-subtitle"
});


const addNewPlace = (data) => {
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
};



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
            console.log(1)
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
  postList.prepend(cardElement);
}


//Превью
const popupPreviewModal = new PopupWithImag(".preview-popup")
popupPreviewModal.setEventListeners()


//Формы профиля и добавления карточки
const profilePopup = new PopupWithForm(".profile-popup", changeProfile);
const addCardPopup = new PopupWithForm(".add-popup", addNewPlace);

profilePopup.setEventListeners();
addCardPopup.setEventListeners();


//Форма добавления новой карточки
const editFormValidation = new FormValidator(formValidation, popupProfileForm);
const addCardFormValidation = new FormValidator(formValidation, addForm);


editFormValidation.enableValidation();
addCardFormValidation.enableValidation();

//deleat-submit-popup
const confirmModal = new PopupWithForm(".deleat-submit-popup");
confirmModal.setEventListeners();