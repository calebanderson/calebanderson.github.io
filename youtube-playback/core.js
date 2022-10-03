import './remove_shim.js';
import Constants from './constants.js';
import CustomVideo from './custom_video.js';

// Wanted to try out promises... obviously not the most useful implementation...
function repeatUntilPresent(func, delay) {
  const checkForPresence = (resolve) => {
    const result = func();
    if (result) {
      resolve(result);
    } else {
      setTimeout(checkForPresence.bind(this, resolve), delay);
    }
  };
  return new Promise(checkForPresence);
}

repeatUntilPresent(() => (
  document.readyState !== 'loading' // Used for checking if DOMContentLoaded has already fired
  && document.querySelector(Constants.badgeContainerSelector)
  && document.querySelector(Constants.videoElementSelector)
), 250).then((video) => { window.customVideo = new CustomVideo(video); });
