import CustomBadge from './custom_badge.js';
import CustomVideoCallbacks from './custom_video_callbacks.js';

class BookmarkButton extends CustomBadge {
  static displayPrefix = 'Go To';

  get videoUrl() { return this.getAttribute('videoUrl'); }
  set videoUrl(src) { this.setAttribute('videoUrl', src); }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('bookmark-button', 'clickable');
  }

  attributeChangedCallback() {
    this.textContent = `${BookmarkButton.displayPrefix} ${this.formatTime(this.value)}`;
  }

  formatTime(time) {
    const output = [];
    do {
      output.unshift((`0${Math.floor(time % 60)}`).slice(-2));
      time = Math.floor(time / 60);
    } while (time >= 60);
    return [time, ...output].join(':');
  }
}
customElements.define('bookmark-button', BookmarkButton);

CustomVideoCallbacks.addSetterCallback('src', () => {
  document.querySelectorAll('bookmark-button').forEach((bookmark) => {
    bookmark.videoUrl === document.baseURI ? bookmark.show() : bookmark.hide();
  });
});
