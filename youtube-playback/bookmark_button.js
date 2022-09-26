import CustomBadge from './custom_badge.js';
import CustomVideoCallbacks from './custom_video_callbacks.js';

class BookmarkButton extends CustomBadge {
  static displayPrefix = 'Go To';

  connectedCallback(){
    super.connectedCallback();
    this.classList.add('bookmark-button');
    this.classList.add('clickable');
  }

  get videoUrl(){
    return this.getAttribute('videoUrl');
  }
  set videoUrl(src){
    this.setAttribute('videoUrl', src);
  }

  attributeChangedCallback(_name, _oldValue, _newValue){
    const intValue = parseInt(this.value);
    const seconds = ('0' + intValue % 60).slice(-2);
    let minutes = Math.floor(intValue / 60) % 60;

    if(intValue > 3600){
      minutes = ('0' + minutes).slice(-2);
      const hours = Math.floor(intValue / 3600);
      this.textContent = `${BookmarkButton.displayPrefix} ${hours}:${minutes}:${seconds}`;
    } else {
      this.textContent = `${BookmarkButton.displayPrefix} ${minutes}:${seconds}`;
    }
  }
}
customElements.define('bookmark-button', BookmarkButton);

CustomVideoCallbacks.addSetterCallback('src',
  function(val){
    const bookmarkList = document.querySelectorAll('bookmark-button');
    for(const bookmark of bookmarkList){
      bookmark.videoUrl === this.baseURI ? bookmark.show() : bookmark.hide();
    }
  }
);

export default BookmarkButton;
