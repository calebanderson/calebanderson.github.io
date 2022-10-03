const DefaultConstants = {
  bookmarkPrefix: 'Go To',
  ratePrefix: 'Playback Rate:',
  endcardsHidden: 'Endcards Hidden',
  endcardsShown: 'Endcards Shown',
  autoPauseOn: 'Night Mode',
  autoPauseOff: 'Day Mode',

  autoPauseInterval: 15,
  rateScalar: 1.2599,
  rateAdder: 0.00003,
  seekDuration: 5,

  inputSelector: 'yt-user-mention-autosuggest-input',
  badgeContainerSelector: '#above-the-fold, ytd-video-primary-info-renderer #container',
  videoElementSelector: 'video[src]',

  addBookmark: 'uU',
  increaseRate: ']}',
  decreaseRate: '[{',
  seekForward: ['ArrowRight'],
  seekBackward: ['ArrowLeft'],
  addLoopPoint: 'oO',
  clearLoopPoints: 'pP',
};

const Constants = {
  lookup(key) { return { ...DefaultConstants, ...window.YTPOptions }[key]; },
};

Object.keys(DefaultConstants).forEach((key) => {
  Object.defineProperty(Constants, key, { get() { return this.lookup(key); } });
});

export default Constants;
