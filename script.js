const passwordKey = "zaheerahmed010";

document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("pdfFile");
  const password = document.getElementById("password").value;

  if (password !== passwordKey) {
    alert("Incorrect password!");
    return;
  }

  const file = fileInput.files[0];
  if (file && file.type === "application/pdf") {
    const reader = new FileReader();
    reader.onload = function () {
      const files = JSON.parse(localStorage.getItem("pdfs") || "[]");
      files.push({ name: file.name, data: reader.result });
      localStorage.setItem("pdfs", JSON.stringify(files));
      loadFiles();
    };
    reader.readAsDataURL(file);
  }

  fileInput.value = "";
  document.getElementById("password").value = "";
});

function loadFiles() {
  const container = document.getElementById("fileList");
  const files = JSON.parse(localStorage.getItem("pdfs") || "[]");
  container.innerHTML = "";

  files.forEach((file, index) => {
    const div = document.createElement("div");
    div.className = "file-item";
    div.innerHTML = `
      <a href="${file.data}" target="_blank">${file.name}</a>
      <button class="delete-btn" onclick="deleteFile(${index})">Delete</button>
    `;
    container.appendChild(div);
  });
}

function deleteFile(index) {
  const password = prompt("Enter password to delete:");
  if (password !== passwordKey) {
    alert("Wrong password! Only Zaheer can delete.");
    return;
  }

  const files = JSON.parse(localStorage.getItem("pdfs") || "[]");
  files.splice(index, 1);
  localStorage.setItem("pdfs", JSON.stringify(files));
  loadFiles();
}

window.onload = loadFiles;
