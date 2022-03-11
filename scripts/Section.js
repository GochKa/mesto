export class Section{
  constructor({items, renderer}, blockSelector){
    this._container = document.querySelector(blockSelector);
    this._items = items;
    this._renderer = renderer;
  }

  renderCard(){
    this._items.forEach( (data) =>{
      this._renderer(data, this._container)
    })
  }

  addCard(elem){
    this._container.prepend(elem);
  }
}
