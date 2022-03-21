export class UserInfo {
  constructor({profileNameSelector, profileJobSelector, avatarSelector}){
    this._nameElement = document.querySelector(profileNameSelector)
    this._jobElement = document.querySelector(profileJobSelector)
    //this._userAvatar = document.querySelector(avatarSelector);
  }
  getUserInfo(){
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    }
  }

  setUserInfo(name, about){

    
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    //this._userAvatar.src = avatar; 
  }
}

