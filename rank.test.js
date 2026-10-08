const test = require('node:test');
const assert = require('node:assert');
const { rank } = require('./rank.js');
const DATA = require('./data.js');

const gym = (name, open, busyAt17, sessions = []) => ({
  name,
  open: Array(7).fill(open),
  busy: Array(7).fill(Object.assign(Array(24).fill(null), { 17: busyAt17 })),
  sessions: Array(7).fill(sessions),
});

test('least busy open gym first, closed gyms last', () => {
  const data = { gyms: [gym('closed', ['08:00', '17:00'], 5), gym('busy', ['08:00', '22:00'], 80), gym('calm', ['08:00', '22:00'], 30)] };
  assert.deepStrictEqual(rank(data, 1, 17).map((r) => r.gym.name), ['calm', 'busy', 'closed']);
});

test('gym closing mid-hour counts as closed for that hour', () => {
  const [r] = rank({ gyms: [gym('a', ['08:00', '17:30'], 10)] }, 1, 17);
  assert.strictEqual(r.open, false);
});

test('sessions overlapping the hour are listed, touching ones are not', () => {
  const s = [['16:00', '17:00', 'before'], ['16:30', '17:15', 'overlap'], ['18:00', '19:00', 'after']];
  const [r] = rank({ gyms: [gym('a', ['08:00', '22:00'], 10, s)] }, 1, 17);
  assert.deepStrictEqual(r.sessions.map(([, , n]) => n), ['overlap']);
});

test('real data is well-formed', () => {
  for (const g of DATA.gyms) {
    assert.strictEqual(g.open.length, 7);
    assert.strictEqual(g.busy.length, 7);
    assert.strictEqual(g.sessions.length, 7);
    g.busy.forEach((row) => assert.strictEqual(row.length, 24));
  }
  const fless = DATA.gyms.find((g) => g.name === 'fless! Buda');
  assert.deepStrictEqual(fless.open[3], ['14:00', '22:00'], 'Monday first: index 3 is Thursday');
});
