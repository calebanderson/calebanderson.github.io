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

Promise.all([
  repeatUntilPresent(() => document.querySelector(new Constants().videoElementSelector), 250),
  repeatUntilPresent(() => document.querySelector(new Constants().badgeContainerSelector), 250),
]).then(([video]) => {
  window.customVideo = new CustomVideo(video);
});
