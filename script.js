const usernameInput = document.getElementById("username");
const tweetInput = document.getElementById("tweet");
const badgeSelect = document.getElementById("badge");
const toggleThemeBtn = document.getElementById("toggleTheme");
const generateBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download");
const card = document.getElementById("card");
const cardUsername = document.getElementById("cardUsername");
const cardText = document.getElementById("cardText");
const checkmark = document.getElementById("checkmark");

let darkMode = false;

toggleThemeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  card.className = darkMode ? "dark" : "light";
});

generateBtn.addEventListener("click", () => {
  const username = usernameInput.value || "@User";
  const text = tweetInput.value || "Write something awesome!";
  const badge = badgeSelect.value;

  cardUsername.innerHTML = username;
  checkmark.innerHTML = "";

  if (badge !== "none") {
    const emoji = badge === "blue" ? "💙" : badge === "gold" ? "🟡" : "⚪";
    checkmark.textContent = emoji;
  }

  cardText.textContent = text;
});

downloadBtn.addEventListener("click", () => {
  html2canvas(card).then(canvas => {
    const link = document.createElement("a");
    link.download = "visualify_card.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
