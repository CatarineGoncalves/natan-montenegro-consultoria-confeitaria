const header = document.querySelector('#header');
const nav = document.querySelector('#nav');
const menuToggle = document.querySelector('#menuToggle');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const glow = document.querySelector('.cursor-glow');
const imageModal = document.querySelector('#imageModal');
const modalImage = document.querySelector('#modalImage');
const modalClose = document.querySelector('#modalClose');
const galleryItems = document.querySelectorAll('.gallery-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 48);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.body.classList.toggle('no-scroll', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  });
});

window.addEventListener('mousemove', (event) => {
  if (!glow) return;
  glow.style.opacity = '1';
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}, { passive: true });

window.addEventListener('mouseleave', () => {
  if (glow) glow.style.opacity = '0';
});

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const imageSrc = item.dataset.img;
    modalImage.src = imageSrc;
    imageModal.showModal();
  });
});

modalClose.addEventListener('click', () => imageModal.close());
imageModal.addEventListener('click', (event) => {
  if (event.target === imageModal) imageModal.close();
});

document.querySelector('#videoButton').addEventListener('click', () => {
  alert('Substitua este bloco pelo vídeo institucional do chef quando estiver disponível.');
});
