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

function bytesToMB(bytes) {
  if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }
}

// ---------------- File Info Modal Handling ----------------

async function openFileInfoModal(id) {
  try {
    const response = await fetch(`/files/${id}/info`);

    if (!response.ok) {
      throw new Error(`Failed to get file details: ${response.statusText}`);
    }

    const fileInfo = await response.json();

    if (!fileInfo || !fileInfo.name || !fileInfo.type) {
      throw new Error("File details not found");
    }

    const { name, type, size, createdAt } = fileInfo;

    const fileName = document.getElementById("file-name");
    fileName.textContent = name;

    const fileType = document.getElementById("file-type");
    fileType.textContent = type;

    const fileSize = document.getElementById("file-size");
    fileSize.textContent = bytesToMB(parseInt(size, 10));

    const fileCreated = document.getElementById("file-created");
    fileCreated.textContent = new Date(createdAt).toLocaleString();

    const fileInfoModal = document.getElementById("file-info-modal");
    fileInfoModal.classList.remove("hidden");
  } catch (error) {
    console.log(error);
  }
}

// Closes other unused file menus
window.addEventListener("click", (e) => {
  document.querySelectorAll(".file-menu").forEach((menu) => {
    if (
      !menu.contains(e.target) &&
      !menu.previousElementSibling.contains(e.target)
    ) {
      menu.classList.add("hidden");
    }
  });
});

// ---------------- Share Modal Handling ----------------

let selectedFileId = null;

function openShareModal(fileId) {
  selectedFileId = fileId;
  closeAllMenus();
  openModal("share-modal");
}

function closeAllMenus() {
  document
    .querySelectorAll(".file-menu")
    .forEach((m) => m.classList.add("hidden"));
}

function copyLink(event, link) {
  navigator.clipboard.writeText(link);
  const btn = event.target;
  btn.textContent = "Copied!";
  setTimeout(() => (btn.textContent = "Copy"), 1500);
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
      throw new Error(`Failed to get signed URL: ${response.statusText}`);
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
