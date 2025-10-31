function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

function toggleMenu(id) {
  const menu = document.getElementById(id);
  menu.classList.toggle("hidden");
}

function copyLink(event, link) {
  navigator.clipboard.writeText(link);
  const btn = event.target;
  btn.textContent = "Copied!";
  setTimeout(() => (btn.textContent = "Copy"), 1500);
}

let selectedFileId = null;

function openShareModal(fileId) {
  selectedFileId = fileId;
  closeAllMenus();
  openModal("share-modal");
}

function openFileModal(fileId) {}

function closeAllMenus() {
  document
    .querySelectorAll(".file-menu")
    .forEach((m) => m.classList.add("hidden"));
}

async function generateSignedUrl() {
  const durationInput = document.querySelector(
    'input[name="duration"]:checked'
  );
  if (!durationInput) {
    alert("Please select a link duration first!");
    return;
  }

  const time = durationInput.value;

  try {
    const shareLink = document.getElementById("share-link");
    shareLink.value = "Generating Link Please Wait....";

    const response = await fetch(
      `/files/${selectedFileId}/signed-url?time=${time}`
    );

    if (!response.ok) {
      throw new Error(`Faield to get signed URL: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.signedUrl) {
      throw new Error("Signed URL not found in response");
    }

    shareLink.value = data.signedUrl;
  } catch (error) {
    console.log("Error fetching signed URL: ", err);
  }
}
