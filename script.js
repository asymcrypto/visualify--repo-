const usernameInput = document.getElementById("username");
const tweetText = document.getElementById("tweetText");
const displayName = document.getElementById("displayName");
const displayText = document.getElementById("displayText");
const themeSelect = document.getElementById("theme");
const preview = document.getElementById("preview");
const generateBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download");
const blueCheck = document.getElementById("blueCheck");
const checkmarkToggle = document.getElementById("checkmark");

generateBtn.addEventListener("click", () => {
  displayName.textContent = usernameInput.value || "Anonymous";
  displayText.textContent = tweetText.value || "Write something amazing here...";
  const theme = themeSelect.value;
  preview.className = `card-preview ${theme}`;
  blueCheck.style.display = checkmarkToggle.checked ? "inline" : "none";
});

downloadBtn.addEventListener("click", () => {
  html2canvas(preview).then(canvas => {
    const link = document.createElement('a');
    link.download = 'visualify_post.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

console.log("Visualify Creator ready 🚀");

// Dynamic component loader
async function loadComponent(file) {
  try {
    const res = await fetch(`components/${file}`);
    const script = await res.text();
    eval(script);
    console.log(`${file} loaded ✅`);
  } catch (err) {
    console.error(`Failed to load ${file}:`, err);
  }
}

// Load future updates automatically
["themes.js", "checkmarks.js", "quotes.js"].forEach(loadComponent);
