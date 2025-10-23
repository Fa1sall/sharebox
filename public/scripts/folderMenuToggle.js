const toggleFolderMenu = (id) => {
  document.getElementById(id).classList.toggle("hidden");
};

window.addEventListener("click", (e) => {
  document.querySelectorAll(".folder-menu").forEach((menu) => {
    if (
      !menu.contains(e.target) &&
      !menu.previousElementSibling.contains(e.target)
    ) {
      menu.classList.add("hidden");
    }
  });
});
