// Dynamic import to set up environment as a module and add import metadata
window.testConstant2 ||= 'youtube-playback.js testConstant2';
console.log(`after testConstant1 ||= setter: ${window.testConstant2}`);

import('https://calebanderson.github.io/youtube-playback/core.js');

console.log(`after youtube-playback.js import: ${window.testConstant2}`);
