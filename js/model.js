const initialState = {
  menuOpen: false,
  selectedCategory: null,
  selectedExperience: null,
  formStatus: null,
};

export function createModel() {
  let state = { ...initialState };

  return {
    getState() {
      return { ...state };
    },
    toggleMenu() {
      state = { ...state, menuOpen: !state.menuOpen };
      return this.getState();
    },
    closeMenu() {
      state = { ...state, menuOpen: false };
      return this.getState();
    },
    selectCategory(category) {
      state = { ...state, selectedCategory: category };
      return this.getState();
    },
    selectExperience(experience) {
      state = { ...state, selectedExperience: experience };
      return this.getState();
    },
    validateContact(form) {
      if (!form.checkValidity()) {
        state = { ...state, formStatus: 'invalid' };
        return { valid: false, state: this.getState() };
      }
      state = { ...state, formStatus: 'success' };
      return { valid: true, state: this.getState() };
    },
  };
}
