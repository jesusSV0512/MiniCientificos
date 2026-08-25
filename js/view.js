export function createView(document) {
  const elements = {
    menuButton: document.getElementById('menu-button'),
    mobileMenu: document.getElementById('mobile-menu'),
    gallery: document.getElementById('galeria'),
    workshops: document.getElementById('talleres'),
    contact: document.getElementById('contacto'),
    contactForm: document.getElementById('contact-form'),
    formStatus: document.getElementById('form-status'),
    moreCategories: document.getElementById('more-categories'),
  };

  const galleryStatus = document.createElement('p');
  galleryStatus.className = 'text-center font-body-md text-body-md text-primary';
  galleryStatus.style.marginTop = 'calc(1.5rem + 0.55cm)';
   galleryStatus.style.marginBottom = '2rem';
  galleryStatus.setAttribute('role', 'status');
  galleryStatus.setAttribute('aria-live', 'polite');
  elements.gallery.after(galleryStatus);

  return {
    elements,
    galleryCards: elements.gallery.querySelectorAll('.group'),
    filterButtons: document.querySelectorAll('[data-filter]'),
    mobileLinks: elements.mobileMenu.querySelectorAll('a'),
    setMenuOpen(isOpen) {
      elements.menuButton.setAttribute('aria-expanded', String(isOpen));
      elements.menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      elements.menuButton.querySelector('span').textContent = isOpen ? 'close' : 'menu';
      elements.mobileMenu.classList.toggle('hidden', !isOpen);
    },
    setCategorySelected(button) {
      this.filterButtons.forEach((item) => item.classList.remove('ring-4', 'ring-primary/30'));
      button.classList.add('ring-4', 'ring-primary/30');
    },
    setGalleryStatus(message) {
      galleryStatus.textContent = message;
    },
    setFormStatus(status) {
      const messages = {
        invalid: 'Completa todos los campos con información válida.',
        success: '¡Gracias! Recibimos tu mensaje y pronto nos pondremos en contacto.',
      };
      elements.formStatus.textContent = messages[status] || '';
      elements.formStatus.className = `text-center font-body-md text-body-md ${status === 'success' ? 'text-[#2a9d5c]' : 'text-error'}`;
    },
    scrollTo(element) {
      element.scrollIntoView({ behavior: 'smooth' });
    },
  };
}