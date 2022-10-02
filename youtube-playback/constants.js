const DefaultConstants = {
  autoPauseInterval: 15,
  bookmarkPrefix: 'Go To',
  ratePrefix: 'Playback Rate:',
  rateScalar: 1.2599,
  rateAdder: 0.00003,
  seekDuration: 5,
  inputSelector: 'yt-user-mention-autosuggest-input',
  badgeContainerSelector: '#above-the-fold, ytd-video-primary-info-renderer #container',
  videoElementSelector: 'video[src]',
  endcardsHidden: 'Endcards Hidden',
  endcardsShown: 'Endcards Shown',
};

class Constants {
  constructor() {
    Object.assign(this, { ...DefaultConstants, ...window.YTPOptions });
  }
}
export default Constants;
