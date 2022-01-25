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

function createCard(item){
  const postItemTemp = postBlockTemp.cloneNode(true);
  const postTempImg = postItemTemp.querySelector(".post-list__photo");
  const postTempTitle = postItemTemp.querySelector(".post-list__title");
  const postTempDelButton = postItemTemp.querySelectorAll(".delete");
  const postTempLikeButton = postItemTemp.querySelectorAll(".post-list__like");
  
  postTempImg.src = item.link;
  postTempTitle.textContent = item.name;
  postTempTitle.alt = item.name;
  
  postTempImg.addEventListener("click", () => {
    openPopup(popupZoom);
    popupZoomImg.src = item.link;
    popupZoomTitle.textContent = item.name;
  });

  postTempLikeButton.forEach((item) => {
    item.addEventListener("click", function (event) {
      const eventTarget = event.target;
      eventTarget.classList.toggle("post-list__like_active");
    })
  })

  postTempDelButton.forEach((item) => {
    item.addEventListener("click", function (evt) {
      const evtTar = evt.target.closest(".post-list__item");
      evtTar.remove();
    })
  })


 
  postList.prepend(postItemTemp);

  return postItemTemp;
  
}
initialCards.forEach(createCard)

//Константы для popup'ов
const popupProfile = document.querySelector(".profile-popup");
const popupAdd = document.querySelector(".add-popup");


//Кнопки открытия popup'ов
const popupProfileOpenButton = document.querySelector(".edit-button");
const popupAddNewPlaceButton = document.querySelector(".add-bottun");


//Кнопки закрытия popup'ов
const popupCloseButton = document.querySelector(".popup__close");
const popupAddCloseButton = document.querySelector(".blur")
const popupZoomCLoseButton = document.querySelector(".shut");

//Функции кнопок popup'ов
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup){
  popup.classList.remove("popup_opened");
}

//Обработчики кнопок 
    //Открытие
popupProfileOpenButton.addEventListener("click", () =>{
  popupCopy();
  openPopup(popupProfile);
});

popupAddNewPlaceButton.addEventListener("click", () =>{
  openPopup(popupAdd);
});

    //Закрытие
popupCloseButton.addEventListener("click", () =>{
  closePopup(popupProfile);
})

popupAddCloseButton.addEventListener("click", () =>{
  closePopup(popupAdd);
})

popupZoomCLoseButton.addEventListener("click", () =>{
  closePopup(popupZoom);
})


//!Кнопка сохранения информации профиля

//Текст в профиле
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");

//Форма в Popup'е
const popupForm = document.querySelector(".input-info");

//Поля формы
const popupName = document.querySelector(".popup__text");
const popupJob = document.querySelector(".extra");

function profileChange(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup(popupProfile);
}

popupForm.addEventListener('submit', profileChange);

//Копирование данных из профиля в Popup
function popupCopy() {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

popupProfileOpenButton.addEventListener("click", popupCopy)


//Форма добавления новой карточки
const addForm = document.querySelector(".img");

  //Поля формы добавления 
const addFormName = document.querySelector(".nameplace");
const addFormLink = document.querySelector(".link");

function addNewPlace(event){
  event.preventDefault();
  const copyPostItem = postBlockTemp.querySelector(".post-list__item").cloneNode(true);
  
  const copyLike = copyPostItem.querySelectorAll(".post-list__like");
  const copyDel = copyPostItem.querySelectorAll(".delete");

  const copyImg = copyPostItem.querySelector(".post-list__photo");
  const copyTitle = copyPostItem.querySelector(".post-list__title");

  

  copyImg.src = addFormLink.value;
  copyTitle.textContent = addFormName.value;

  copyImg.addEventListener("click", () => {
    openPopup(popupZoom);
    popupZoomImg.src = copyImg.src;
    popupZoomTitle.textContent = copyTitle.textContent;
  });

  copyLike.forEach((item) => {
    item.addEventListener("click", function (event) {
      const eventTarget = event.target;
      eventTarget.classList.toggle("post-list__like_active");
    })
  })

  copyDel.forEach((item) => {
    item.addEventListener("click", function (evt) {
      const evtTar = evt.target.closest(".post-list__item");
      evtTar.remove();
    })
  })
 
  postList.prepend(copyPostItem);

  addFormName.value = "";
  addFormLink.value = "";
 
  popupAdd.classList.remove("popup_opened");
}

addForm.addEventListener("submit", addNewPlace);