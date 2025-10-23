const openModal = (id) => {
  document.getElementById(id).classList.remove("hidden");
};

const closeModal = (id) => {
  document.getElementById(id).classList.add("hidden");
};
