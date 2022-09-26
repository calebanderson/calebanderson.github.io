// de-shimming a ES5 shim that youtube uses
new Promise(function(resolve) {
  customElements.define = CustomElementRegistry.prototype.define;
  customElements.get = CustomElementRegistry.prototype.get;
  HTMLElement = HTMLElement.prototype.constructor;
  resolve();
}).then(function(){
  import CustomVideo from './custom_video.js';
  import CustomCookie from './custom_cookie.js';
  window.customCookie = CustomCookie;

  // Wanted to try out promises... obviously not the most useful implementation...
  function repeatUntilPresent(func, delay){
    const checkForPresence = function(resolve){
      const result = func();
      if(result){
        resolve(result);
      } else {
        setTimeout(checkForPresence.bind(this, resolve), delay);
      }
    }
    return new Promise(checkForPresence);
  }

  Promise.all([
    repeatUntilPresent(()=>document.querySelector(CustomVideo.videoElementSelector), 250),
    repeatUntilPresent(()=>document.querySelector(CustomVideo.badgeContainerSelector), 250)
  ]).then(([video, container])=>{
    window.customVideo = new CustomVideo(video);
  });
});
