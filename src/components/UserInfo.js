export class UserInfo {
  constructor({profileNameSelector, profileJobSelector, avatarSelector}){
    this._nameElement = document.querySelector(profileNameSelector)
    this._jobElement = document.querySelector(profileJobSelector)
    this._avatarElement = document.querySelector(avatarSelector);

  }
  getUserInfo(){
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement
    }
  }

  setUserInfo({name, about}){
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
  }

  setNewAvatar({avatar}){
    this._avatarElement.src = avatar;
  }

}

