// ==============================
// ✅ CHECKMARK + USERNAME + AVATAR MODULE
// ==============================
(() => {
  console.log("checkmarks.js initialized ✅");

  const container = document.querySelector("#visual-preview");
  if (!container) return console.warn("Visual preview not found!");

  // Create wrapper for profile section
  const profile = document.createElement("div");
  profile.className = "profile-section";

  // Avatar
  const avatar = document.createElement("img");
  avatar.src = "https://avatars.githubusercontent.com/u/106999992?s=100"; // Replace with your preferred default
  avatar.alt = "Avatar";
  avatar.className = "avatar";

  // Username + checkmark
  const username = document.createElement("div");
  username.className = "username";
  username.innerHTML = `
    <span>@Asym_Alwali</span>
    <span class="checkmark blue">✔</span>
  `;

  // Append all
  profile.appendChild(avatar);
  profile.appendChild(username);
  container.prepend(profile);

  // Optional: make it editable later
})();
