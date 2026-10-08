# Where2Climb

Pick a weekday and hour, see which Budapest bouldering gym is least busy.
Static page: `index.html` + `data.js` + `rank.js`. No build. Test: `node --test`.

## Monthly data refresh

Google Maps hides Popular times unless logged in, so use the user's real Chrome (Claude in Chrome), not a headless browser.

1. For each gym, open its `maps` URL from `data.js` and run `tools/popular-times.js` in the page. Paste the result into `busy`. Copy opening hours into `open`.
2. Open each `timetable` URL and copy the sessions into `sessions` (Monday first). Flow Boulder's Friday table has no header row. Fless is a grid, so match cards to day columns by x position.
3. Set `checked` to today, run `node --test`, commit, push.
