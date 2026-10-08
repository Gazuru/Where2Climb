const toMin = (t) => +t.slice(0, 2) * 60 + +t.slice(3);

function rank(data, day, hour) {
  const from = hour * 60;
  const to = from + 60;
  return data.gyms
    .map((gym) => {
      const [o, c] = gym.open[day];
      const open = from >= toMin(o) && to <= toMin(c);
      return {
        gym,
        open,
        busy: open ? gym.busy[day][hour] : null,
        sessions: gym.sessions[day].filter(([s, e]) => toMin(s) < to && toMin(e) > from),
      };
    })
    .sort((a, b) => (b.open - a.open) || ((a.busy ?? 101) - (b.busy ?? 101)));
}

if (typeof module !== 'undefined') module.exports = { rank };
