const KEY = 'lac:purchases';

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? {}; }
  catch { return {}; }
}

export function has(slug, type) {
  return read()[slug]?.includes(type) ?? false;
}

export function grant(slug, type) {
  const all = read();
  all[slug] = [...new Set([...(all[slug] ?? []), type])];
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch {}
}