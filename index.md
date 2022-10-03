# calebanderson.github.io
#### Public distribution links for custom libraries and extensions:
### [YouTube Controls Extension](https://calebanderson.github.io/youtube-playback.js)
#### Installation Instructions:
- Install the [User JavaScript and CSS](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?hl=en) Chrome Extension
- In the extension's Settings > Libraries area, add https://calebanderson.github.io/youtube-playback.js as a library source
- Create a rule for youtube.com and include the created library using the Options dropdown
  - The extension requires _some_ content in either JS or CSS (comments do satisfy this requirement)
  - The "Programmatic Injection" option for JavaScript should remain off
- Some configuration is exposed (see https://calebanderson.github.io/youtube-playback/constants.js)
  - To change any of these values, add overrides to an object at `window.YTPOptions`

#### Features:
- Playback rate display
- Square brackets increase/decrease playback rate based on a multiplicative scalar
  - Default setting is based on 3 steps changing the playback rate by a factor of 2 
- Add bookmarks for the current point in the video with 'U'
  - Click to return to the indicated timestamp
  - Click with the Command or Windows key to remove a bookmark
- Endcard visibility toggle
- "Night Mode" auto-pause toggle (default pauses 15 minutes from last 'play' action)
- Add A-B loop point with 'O', clear A-B loop points with 'P'
  - A good way to remember: typing the word 'loop' will add 2 points then clear them
