const initialCards = [{
    name: 'Река Ли, Китай',
    link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_0c55afbdfda1cfd00bea35e96b4dfb25.jpg'
  },
  {
    name: 'Горы Тяньцзи, Китай',
    link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_f436509ef066bf8709a18b4249482acc.jpg'
  },
  {
    name: 'Долина Йосемити, США',
    link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_59c3c2e868a84654118af91efc201229.jpg'
  },
  {
    name: 'Мачу-Пикчу, Перу',
    link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_4f7f27067bc0f9250078b361014720f6.jpg'
  },
  {
    name: 'Шондонг, Вьетнам',
    link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_abf27fe402a0a23d562d45fc0b637142.jpg'
  },
  {
    name: 'Гейрангер-фьорд, Норвегия',
    link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_44622a18dda9f72bee0e798a9fcc9f5c.jpg'
  }
];

const postBlockTemp = document.querySelector("#post-temp").content;
const postList = document.querySelector(".post-list");
const popupZoom = document.querySelector(".zoom");
const popupZoomImg = document.querySelector(".zoom__img");
const popupZoomTitle = document.querySelector(".zoom__title");

function createCard(cardData) {
  const postItemTemp = postBlockTemp.cloneNode(true);
  const postTempImg = postItemTemp.querySelector(".post-list__photo");
  const postTempTitle = postItemTemp.querySelector(".post-list__title");
  const postTempDelButton = postItemTemp.querySelector(".delete");
  const postTempLikeButton = postItemTemp.querySelector(".post-list__like");

  postTempImg.src = cardData.link;
  postTempTitle.textContent = cardData.name;
  postTempImg.alt = cardData.name;

  postTempImg.addEventListener("click", () => {
    openPopup(popupZoom);
    popupZoomImg.src = cardData.link;
    popupZoomTitle.textContent = cardData.name;
    popupZoomImg.alt = cardData.name;
  });

  postTempLikeButton.addEventListener("click", function (event) {
      const eventTarget = event.target;
      eventTarget.classList.toggle("post-list__like_active");
    });

  postTempDelButton.addEventListener("click", function (evt) {
      const evtTar = evt.target.closest(".post-list__item");
      evtTar.remove();
    });

  return postItemTemp;
}

function renderCard(data) {
  const card = createCard(data);
  postList.prepend(card);
}

initialCards.forEach(renderCard);

//Константы для popup'ов
const popupProfile = document.querySelector(".profile-popup");
const popupAdd = document.querySelector(".add-popup");


//Кнопки открытия popup'ов
const popupProfileOpenButton = document.querySelector(".edit-button");
const popupAddNewPlaceButton = document.querySelector(".add-bottun");


//Кнопки закрытия popup'ов
const popupCloseButton = document.querySelector(".popup__close");
const popupAddCloseButton = document.querySelector(".close-addform")
const popupZoomCLoseButton = document.querySelector(".close-zoom");

//Функции кнопок popup'ов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", closePopupOnOverlay);
  document.addEventListener("keydown", closePopupKeyHandler);
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", closePopupOnOverlay);
  document.removeEventListener("keydown", closePopupKeyHandler);
};

function closePopupOnOverlay(evt){
  if (evt.target === evt.currentTarget){
    evt.target.classList.remove("popup_opened");
    clearErrorMessage()
  }
}

function closePopupKeyHandler(event){
  if(event.key === "Escape" || event.keyCode === 27){
    const classClosing = document.querySelector(".popup_opened");
    closePopup(classClosing);
    clearErrorMessage()
  }
}

//Обработчики кнопок 
//Открытие
const submitProfileButton = document.querySelector(".change");
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

popupZoomCLoseButton.addEventListener("click", () => {
  closePopup(popupZoom);
});



//!Кнопка сохранения информации профиля

//Текст в профиле
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");

//Форма в Popup'е
const popupProfileForm = document.querySelector(".input-info");

//Поля формы
const popupProfileName = document.querySelector(".popup__text");
const popupProfileJob = document.querySelector(".extra");

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
const addForm = document.querySelector(".addnewcard");

//Поля формы добавления 
const addFormName = document.querySelector(".nameplace");
const addFormLink = document.querySelector(".link");
const addNewPostButton = document.querySelector(".createcard");


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

function clearErrorMessage(){
  const errorFirts = document.querySelector("#error-first");
  const errorProf = document.querySelector("#error-profession");
  const errorPlace = document.querySelector("#error-place");
  const errorLink = document.querySelector("#error-link");
  const popupRedBorder = document.querySelectorAll(".popup__text");

  errorFirts.textContent= "";  
  errorProf.textContent = "";
  errorPlace.textContent = "";
  errorLink.textContent = "";
  
  popupRedBorder.forEach( (input) =>{
    input.classList.remove("popup__text_type_error");
  })
}