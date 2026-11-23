export async function loadPoem(slug) {
    const res = await fetch(`poems/${slug}.json`);
    if (!res.ok) throw new Error(`Poem not found: ${slug}`);
    return res.json();
}

export function renderPoem(poem, container, isUnlocked = () => true) {
    container.replaceChildren();
    for (const line of poem.lines) {
        for (const token of line) {
            if (typeof token == 'string') {
                container.append(token);
            } else {
                const open = isUnlocked(token.t);
                const span = document.createElement('span');
                span.className = open ? 'unlocked-word' : 'locked-word';
                span.textContent = open ? token.w : '■'.repeat(token.w.length);
                span.dataset.type = token.t;
                container.append(span);
            }
        }
        container.append(document.createElement('br'));
    }

}

export function lockableWords(poem) {
    return poem.lines.flat().filter(piece => typeof piece !== 'string');
}

export function countWords(poem) {
    return lockableWords(poem).length;
}

export function countUnlocked(poem, isUnlocked) {
    return lockableWords(poem).filter(word => isUnlocked(word.t)).length;
}
