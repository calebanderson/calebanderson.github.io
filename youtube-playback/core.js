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

const scriptSelector = 'script[data-source="User JavaScript and CSS extension"]:not([src])';

Promise.all([
  repeatUntilPresent(() => document.querySelector(Constants.videoElementSelector), 250),
  repeatUntilPresent(() => document.querySelector(scriptSelector), 250),
  repeatUntilPresent(() => document.querySelector(Constants.badgeContainerSelector), 250),
]).then(([video]) => {
  console.log('Promise loaded');
  window.customVideo = new CustomVideo(video);
});

Promise.all([
  repeatUntilPresent(() => {
    console.log(Constants.videoElementSelector);
    document.querySelector(Constants.videoElementSelector);
  }, 250),
  repeatUntilPresent(() => document.querySelector(Constants.badgeContainerSelector), 250),
]).then(([video]) => {
  console.log('Old promise loaded');
  window.customVideo = new CustomVideo(video);
});

document.addEventListener('DOMContentLoaded', () => { console.log('DOMContentLoaded'); });
