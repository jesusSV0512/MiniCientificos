export function createController(model, view) {
  function closeMenu() {
    model.closeMenu();
    view.setMenuOpen(false);
  }

  function selectExperience(card) {
    const title = card.querySelector('h3').textContent.trim();
    model.selectExperience(title);
    view.setGalleryStatus(`Seleccionaste ${title}. Escríbenos para reservar una experiencia.`);
    view.scrollTo(view.elements.contact);
  }

  view.elements.menuButton.addEventListener('click', () => {
    view.setMenuOpen(model.toggleMenu().menuOpen);
  });

  view.mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

  view.galleryCards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    const activate = () => selectExperience(card);
    card.addEventListener('click', activate);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
  });

  view.filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.textContent.trim();
      model.selectCategory(category);
      view.setCategorySelected(button);
      view.setGalleryStatus(`Explorando experiencias de ${category}.`);
      view.scrollTo(view.elements.workshops);
    });
  });

  view.elements.moreCategories.addEventListener('click', () => {
    view.setGalleryStatus('Estas son todas nuestras áreas de exploración. Elige una para comenzar.');
  });

  view.elements.contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = model.validateContact(view.elements.contactForm);
    view.setFormStatus(result.state.formStatus);
    if (!result.valid) {
      view.elements.contactForm.reportValidity();
      return;
    }
    view.elements.contactForm.reset();
  });
}
