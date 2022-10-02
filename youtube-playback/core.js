import './remove_shim.js';
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

window.testConstant1 ||= 'core.js testConstant1';
console.log(`after testConstant1 ||= setter: ${window.testConstant1}`);

Promise.all([
  repeatUntilPresent(() => document.querySelector(CustomVideo.videoElementSelector), 250),
  repeatUntilPresent(() => document.querySelector(CustomVideo.badgeContainerSelector), 250),
]).then(([video]) => {
  console.log(`before CustomVideo creation: ${window.testConstant1}`);
  window.customVideo = new CustomVideo(video);
});
