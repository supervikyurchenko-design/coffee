// === Переключение табов меню ===
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.menu__grid');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.toggle('is-active', t === tab));
    panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === target));
  });
});

// === Маска телефона (простая) ===
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
  let digits = e.target.value.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (!digits.startsWith('7')) digits = '7' + digits;
  digits = digits.slice(0, 11);

  let formatted = '+7';
  if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
  if (digits.length >= 5) formatted += ') ' + digits.slice(4, 7);
  if (digits.length >= 8) formatted += '-' + digits.slice(7, 9);
  if (digits.length >= 10) formatted += '-' + digits.slice(9, 11);
  e.target.value = formatted;
});

// === Минимальная дата — сегодня ===
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;
if (!dateInput.value) dateInput.value = today;

// === Отправка формы ===
const form = document.getElementById('bookingForm');
const success = form.querySelector('.form__success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.replace(/\D/g, '');

  if (name.length < 2) {
    form.name.focus();
    form.name.style.borderColor = '#d9534f';
    return;
  }
  if (phone.length < 11) {
    form.phone.focus();
    form.phone.style.borderColor = '#d9534f';
    return;
  }

  // В реальной интеграции — отправка на сервер / в Telegram-бот.
  success.hidden = false;
  form.querySelector('button[type=submit]').disabled = true;
  form.querySelector('button[type=submit]').textContent = 'Заявка отправлена';

  setTimeout(() => {
    form.reset();
    dateInput.value = today;
    success.hidden = true;
    form.querySelector('button[type=submit]').disabled = false;
    form.querySelector('button[type=submit]').textContent = 'Забронировать стол';
  }, 4000);
});

// сбрасываем красную рамку при вводе
['name', 'phone'].forEach(id => {
  document.getElementById(id).addEventListener('input', (e) => {
    e.target.style.borderColor = '';
  });
});

// === Плавная подсветка активного раздела при скролле ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id ? 'var(--accent)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
