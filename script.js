// File: script.js

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");
const novelsContainer = document.getElementById("novels-container");
const novelLinks = document.getElementById("novel-links");

menuToggle.onclick = () => sidebar.classList.toggle("open");

// Load novels dynamically
async function loadNovels() {
  try {
    const res = await fetch("novels.json");
    const data = await res.json();
    novelsContainer.innerHTML = ""; // Clear loading text

    data.novels.forEach((novel) => {
      // Sidebar link
      const link = document.createElement("li");
      link.innerHTML = `<a href="#${novel.id}">${novel.title}</a>`;
      novelLinks.appendChild(link);

      // Novel section
      const section = document.createElement("section");
      section.className = "novel";
      section.id = novel.id;

      const chaptersHTML = novel.chapters
        .map((ch) => `<li><button>${ch}</button></li>`)
        .join("");

      section.innerHTML = `
        <h2>${novel.title}</h2>
        <ul class="chapters">${chaptersHTML}</ul>
        <div class="content">
          <p>${novel.description}</p>
          <button class="like-btn">♥ Like</button>
        </div>
      `;
      novelsContainer.appendChild(section);
    });
  } catch (err) {
    novelsContainer.innerHTML = `<p style="color:red;">Failed to load novels.</p>`;
    console.error("Error loading novels:", err);
  }
}

loadNovels();
