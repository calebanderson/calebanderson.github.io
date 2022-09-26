const CustomStylesheet = {
  stylesheetID: 'custom_stylesheet',

  get styleTag(){
    const tag = document.createElement('link');
    tag.rel = 'stylesheet';
    tag.id = this.stylesheetID;
    tag.href = new URL('custom_styles.css', import.meta.url).href;
    return tag;
  },

  attach(dom){
    if(dom.querySelector(`#${this.stylesheetID}`)) return;

    const target = dom.body || dom;
    target.appendChild(this.styleTag);
  }
}

export default CustomStylesheet;
