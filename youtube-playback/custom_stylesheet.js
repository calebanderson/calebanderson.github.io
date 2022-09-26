const CustomStylesheet = {
  stylesheetID: 'custom_stylesheet',

  get styleTag(){
    const tag = document.createElement('style');
    tag.id = this.stylesheetID;
    tag.textContent = this.styleContent;
    return tag;
  },

  get styleContent(){
    return [...this.styleList].join("\n");
  },

  get styleList(){
    return this._styleList = this._styleList || new Set;
  },

  add(styles){
    this.styleList.add(styles);
  },

  attach(dom){
    if(dom.querySelector(`#${this.stylesheetID}`)) return;
    const target = dom.body || dom;
    target.appendChild(this.styleTag);
  }
}

export default CustomStylesheet;
