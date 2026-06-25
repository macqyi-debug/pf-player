const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let lines = html.split('\n');

console.log("=== Current element locations ===\n");

// Element 4: slide-page page-1
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('slide-page page-1') && !lines[i].includes('<!--')) {
        console.log("slide-page page-1 line", i+1, ":", lines[i].trim().substring(0, 120));
    }
    if (lines[i].includes('class="content-area"') && lines[i].includes('cassette-case')) {
        console.log("content-area line", i+1, ":", lines[i].trim().substring(0, 120));
    }
    if (lines[i].includes('player-top-content') && !lines[i].includes('<!--')) {
        console.log("player-top-content line", i+1, ":", lines[i].trim().substring(0, 120));
    }
    if (lines[i].includes('player-bottom-controls') && lines[i].includes('style=')) {
        console.log("player-bottom-controls line", i+1, ":", lines[i].trim().substring(0, 150));
    }
    if (lines[i].includes('class="controls-row"') && lines[i].includes('style=')) {
        console.log("controls-row line", i+1, ":", lines[i].trim().substring(0, 150));
    }
    if (lines[i].includes('id="playModeIcon"')) {
        console.log("playModeIcon line", i+1, ":", lines[i].trim().substring(0, 150));
    }
    if (lines[i].includes('id="playlistBtn"')) {
        console.log("playlistBtn line", i+1, ":", lines[i].trim().substring(0, 150));
    }
    if (lines[i].includes('id="speedSlider"')) {
        console.log("speedSlider line", i+1, ":", lines[i].trim().substring(0, 150));
    }
    if (lines[i].includes('id="volumeSlider"')) {
        console.log("volumeSlider line", i+1, ":", lines[i].trim().substring(0, 150));
    }
    if (lines[i].includes('id="progressContainer"') && lines[i].includes('class=')) {
        console.log("progressContainer line", i+1, ":", lines[i].trim().substring(0, 150));
    }
    if (lines[i].includes('id="bgSettingsBtn"')) {
        console.log("bgSettingsBtn line", i+1, ":", lines[i].trim().substring(0, 150));
    }
    if (lines[i].includes('class="volume-indicator"')) {
        console.log("volumeIndicator line", i+1, ":", lines[i].trim().substring(0, 150));
    }
    if (lines[i].includes('progress-indicator') && lines[i].includes('class=') && lines[i].includes('id="progressIndicator')) {
        console.log("progressIndicator line", i+1, ":", lines[i].trim().substring(0, 200));
    }
}
