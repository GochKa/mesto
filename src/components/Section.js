export class Section{
  constructor({ renderer}, blockSelector){
    this._container = document.querySelector(blockSelector);
    this._renderer = renderer;
  }

  renderCard(items){
    items.reverse().forEach( (data) =>{
      this._renderer(data)
    })
  }

  addCard(elem){
    this._container.prepend(elem);
  }
}
