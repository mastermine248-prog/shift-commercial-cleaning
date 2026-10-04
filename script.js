const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
}));

const compare = document.querySelector('[data-compare]');
if (compare) {
  const range = compare.querySelector('input[type="range"]');
  const buttons = [...document.querySelectorAll('[data-compare-set]')];
  range.addEventListener('input', () => compare.style.setProperty('--position', range.value + '%'));
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    const before = compare.querySelector('.compare-before');
    const after = compare.querySelector('.compare-after img');
    before.src = button.dataset.before;
    after.src = button.dataset.after;
    before.alt = button.dataset.name + ' before cleaning';
    after.alt = button.dataset.name + ' after cleaning';
    range.value = 50;
    compare.style.setProperty('--position', '50%');
  }));
}

const marquee = document.querySelector('[data-marquee]');
const marqueeToggle = document.querySelector('[data-marquee-toggle]');
marqueeToggle?.addEventListener('click', () => {
  const paused = marquee.classList.toggle('is-paused');
  marqueeToggle.setAttribute('aria-pressed', String(paused));
  marqueeToggle.textContent = paused ? 'Resume scroll' : 'Pause scroll';
});

const form = document.querySelector('[data-brief-form]');
if (form) {
  const photos = form.elements.photos;
  photos.addEventListener('change', () => {
    const count = photos.files.length;
    form.querySelector('[data-file-label]').textContent = count ? count + ' photo' + (count === 1 ? '' : 's') + ' selected. Files remain in your browser.' : 'Files remain in your browser';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim();
    const valid = data.get('site') && String(data.get('suburb') || '').trim() && String(data.get('name') || '').trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const error = form.querySelector('.form-error');
    error.hidden = Boolean(valid);
    if (!valid) {
      form.querySelector(':invalid')?.focus();
      return;
    }
    const result = form.querySelector('.form-result');
    result.replaceChildren();
    const title = document.createElement('h3');
    title.textContent = 'BRIEF READY.';
    const summary = document.createElement('p');
    summary.textContent = String(data.get('name')).trim() + ', your ' + String(data.get('site')).toLowerCase() + ' site in ' + String(data.get('suburb')).trim() + ' is ready to discuss. Visit rhythm: ' + String(data.get('visits')).toLowerCase() + '.';
    const areas = document.createElement('p');
    areas.textContent = 'Priority areas: ' + (data.getAll('areas').join(', ') || 'to be confirmed') + '.';
    const privacy = document.createElement('p');
    privacy.textContent = 'Demo only. No details or files were sent or stored.';
    result.append(title, summary, areas, privacy);
    result.hidden = false;
    result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });
}
