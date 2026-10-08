// Run in the console of a Google Maps place page opened with ?hl=en while logged in.
// Returns 7 rows (Monday first) of 24 hourly busy %, null = no data.
(() => {
  const isBar = (e) => /% busy at|usually \d+% busy/i.test(e.getAttribute('aria-label') || '');
  const groups = [...new Set([...document.querySelectorAll('[aria-label]')].filter(isBar).map((e) => e.parentElement))];
  const rows = groups.map((g) => {
    const row = Array(24).fill(null);
    let hour = -1;
    for (const el of [...g.children].filter(isBar)) {
      const label = el.getAttribute('aria-label');
      const at = label.match(/(\d+)% busy at (\d+)\s*(am|pm)/i);
      if (at) hour = (+at[2] % 12) + (at[3].toLowerCase() === 'pm' ? 12 : 0);
      else hour += 1;
      row[hour] = +(at ? at[1] : label.match(/usually (\d+)%/i)[1]);
    }
    return row;
  });
  return [...rows.slice(1), rows[0]];
})();
