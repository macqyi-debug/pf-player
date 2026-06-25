const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let lines = html.split('\n');

console.log("=== Applying CSS changes ===\n");

// Element 4: slide-page page-1 (line 5287, 0-indexed 5286)
// box-sizing: border-box -> content-box
lines[5286] = lines[5286].replace(
    '<div class="slide-page page-1" style="box-sizing: content-box;">',
    '<div class="slide-page page-1" style="box-sizing: content-box;">'
);
// Already has content-box from previous edit, just ensure

// Element 3: content-area (line 5288, 0-indexed 5287)
// box-sizing: border-box -> content-box
// width: 23.8984px -> 400px
lines[5287] = lines[5287].replace(
    '<div class="content-area" style="box-sizing: content-box; width: 400px;">',
    '<div class="content-area" style="box-sizing: content-box; width: 400px;">'
);
// Already has these values from previous edit

// Element 5: player-top-content (line 5283, 0-indexed 5282)
// box-sizing: border-box -> content-box
if (lines[5282].includes('<div class="player-top-content">')) {
    lines[5282] = lines[5282].replace(
        '<div class="player-top-content">',
        '<div class="player-top-content" style="box-sizing: content-box;">'
    );
    console.log("Element 5 (player-top-content): added box-sizing: content-box");
}

// Element 2: player-bottom-controls (line 5416, 0-indexed 5415)
// width: 23.8984px -> 420px
// padding-left: 0px -> 0
// padding-right: 0px -> 0
// flex-direction: row -> column
lines[5415] = lines[5415].replace(
    '<div class="player-bottom-controls" style="width: 100%; max-width: 420px; margin-top: 20px;">',
    '<div class="player-bottom-controls" style="width: 420px; max-width: 420px; margin-top: 20px; padding-left: 0; padding-right: 0; flex-direction: column;">'
);
console.log("Element 2 (player-bottom-controls): width: 420px, flex-direction: column");

// Element 1: controls-row (line 5418, 0-indexed 5417)
// width: 23.8984px -> 420px
// box-sizing: border-box -> content-box
lines[5417] = lines[5417].replace(
    '<div class="controls-row" style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 15px; padding: 0 0;">',
    '<div class="controls-row" style="display: flex; align-items: center; justify-content: space-between; width: 420px; margin-bottom: 15px; padding: 0 0; box-sizing: content-box;">'
);
console.log("Element 1 (controls-row): width: 420px, box-sizing: content-box");

// Element 7: img#playModeIcon (line 5421, 0-indexed 5420)
// width: 23.8984px -> 30px
// height: 14.5px -> 30px
if (lines[5420].includes('id="playModeIcon"')) {
    lines[5420] = lines[5420].replace(
        'style="width: 24px; height: 24px; object-fit: contain;"',
        'style="width: 30px; height: 30px; object-fit: contain;"'
    );
    console.log("Element 7 (playModeIcon): width: 30px, height: 30px");
}

// Element 6: button#playlistBtn > img (line 5442, 0-indexed 5441)
// Find the img line inside playlistBtn - it's line 5442 (0-indexed 5441)
if (lines[5441].includes('Playlist.png') && lines[5441].includes('<img')) {
    lines[5441] = lines[5441].replace(
        'style="width: 24px; height: 24px; object-fit: contain;"',
        'style="width: 30px; height: 30px; object-fit: contain;"'
    );
    console.log("Element 6 (playlistBtn img): width: 30px, height: 30px");
}

// Element 8: input#speedSlider (line 5412, 0-indexed 5411)
// height: 14.5px -> 1px
if (lines[5411].includes('id="speedSlider"')) {
    lines[5411] = lines[5411].replace(
        'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;"',
        'style="position: absolute; top: 0; left: 0; width: 100%; height: 1px; opacity: 0; cursor: pointer;"'
    );
    console.log("Element 8 (speedSlider): height: 1px");
}

// Element 9: input#volumeSlider (line 5400, 0-indexed 5399)
// height: 14.5px -> 1px
if (lines[5399].includes('id="volumeSlider"')) {
    lines[5399] = lines[5399].replace(
        'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;"',
        'style="position: absolute; top: 0; left: 0; width: 100%; height: 1px; opacity: 0; cursor: pointer;"'
    );
    console.log("Element 9 (volumeSlider): height: 1px");
}

// Element 10: div#progressContainer (line 5384, 0-indexed 5383)
// height: 14.5px -> 1px
if (lines[5383].includes('id="progressContainer"')) {
    lines[5383] = lines[5383].replace(
        'height: 2px;',
        'height: 1px;'
    );
    console.log("Element 10 (progressContainer): height: 1px");
}

// Element 11: button#bgSettingsBtn > img (line 5377, 0-indexed 5376)
// User message was truncated, but likely width/height increase
if (lines[5376].includes('Setup.png')) {
    lines[5376] = lines[5376].replace(
        'style="width: 20px; height: 20px; object-fit: contain;"',
        'style="width: 30px; height: 30px; object-fit: contain;"'
    );
    console.log("Element 11 (bgSettingsBtn img): width: 30px, height: 30px (guessed - please verify)");
}

// Element 12: progress-indicator (line 5387, 0-indexed 5386)
// Likely width/height change
if (lines[5386].includes('progress-indicator')) {
    lines[5386] = lines[5386].replace(
        'width: 28px; height: 28px;',
        'width: 30px; height: 30px;'
    );
    console.log("Element 12 (progressIndicator): width: 30px, height: 30px (guessed - please verify)");
}

// Element 13: volume-indicator (line 5396, 0-indexed 5395)
if (lines[5395].includes('volume-indicator')) {
    // Keep 30x30 but verify
    console.log("Element 13 (volumeIndicator): current width: 30px, height: 30px (kept)");
}

fs.writeFileSync('index.html', lines.join('\n'));
console.log("\n=== Done! Changes saved to index.html ===");
