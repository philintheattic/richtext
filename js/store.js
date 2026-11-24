const KEY = 'lac:purchases';

function read() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function has(slug) {
  return read().includes(slug);
}

export function grant(slug) {
  const all = read();
  if (!all.includes(slug)) all.push(slug);
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch {}
}