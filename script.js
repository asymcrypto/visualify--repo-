// script.js for create.html (Visualify)
// Handles: theme toggle, badge color, generate preview, download image

// Elements
const usernameInput = document.getElementById('username');
const badgeSelect = document.getElementById('badge');
const tweetInput = document.getElementById('tweet');

const toggleThemeBtn = document.getElementById('toggleTheme');
const generateBtn = document.getElementById('generate');
const downloadBtn = document.getElementById('download');

const card = document.getElementById('card');
const cardUsername = document.getElementById('cardUsername');
const checkmarkEl = document.getElementById('checkmark');
const cardText = document.getElementById('cardText');

// Ensure elements exist (defensive)
if (!card || !cardUsername || !cardText) {
  console.error('Visualify: missing expected DOM elements. Check create.html structure.');
}

/* Theme toggle
   create.html initially sets class "light" on #card.
   This toggles between .light and .dark classes.
*/
function isLightTheme() {
  return card.classList.contains('light') || card.classList.contains('theme-white') || !card.classList.contains('dark');
}

toggleThemeBtn.addEventListener('click', () => {
  if (card.classList.contains('dark')) {
    card.classList.remove('dark');
    card.classList.add('light');
  } else {
    card.classList.remove('light');
    card.classList.add('dark');
  }
});

/* Badge handling
   badgeSelect values: none | blue | gold | gray
   We'll render a small colored circle (SVG-like) or emoji.
*/
function renderBadge(color) {
  if (!color || color === 'none') {
    checkmarkEl.style.display = 'none';
    checkmarkEl.innerHTML = '';
    return;
  }
  checkmarkEl.style.display = 'inline-block';

  // Use a small colored circle with a white check mark for clarity
  const style = `
    display:inline-block;
    width:18px;
    height:18px;
    border-radius:50%;
    vertical-align:middle;
    box-shadow:0 2px 6px rgba(0,0,0,0.15);
    border:2px solid rgba(255,255,255,0.12);
    background:${color};
    text-align:center;
    line-height:18px;
    font-size:12px;
    color: white;
  `;

  // For dark/light background differences, for gold use black checkmark for contrast
  const checkChar = '✔';
  checkmarkEl.innerHTML = `<span style="${style}">${checkChar}</span>`;
}

// Generate preview (update card text + username + badge)
generateBtn.addEventListener('click', async () => {
  const username = (usernameInput.value || '@Asym_Alwali').trim();
  const tweet = (tweetInput.value || '').trim();

  if (!tweet) {
    alert('Please enter the tweet text (or some content) before generating.');
    return;
  }

  // Update card DOM
  cardUsername.textContent = username;
  cardText.textContent = tweet;

  // Apply badge
  const badge = badgeSelect.value;
  const colorMap = {
    blue: '#1d9bf0',
    gold: '#f8b500',
    gray: '#9aa0a6'
  };
  renderBadge(colorMap[badge] || 'none');

  // Ensure card is visible (some setups may hide preview)
  card.style.display = 'block';
  // Scroll preview into view on small screens
  try {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (e) { /* ignore */ }
});

// Download (capture the #card element and download PNG)
downloadBtn.addEventListener('click', async () => {
  // If the card text is empty, prompt to generate first
  const currentText = cardText.textContent && cardText.textContent.trim();
  if (!currentText) {
    alert('Generate the visual first (click Generate Preview), then download.');
    return;
  }

  try {
    // Use high-res capture
    const canvas = await html2canvas(card, { scale: 2, useCORS: true, backgroundColor: null });
    const dataUrl = canvas.toDataURL('image/png');

    // Create auto filename with timestamp
    const now = new Date();
    const stamp = now.toISOString().replace(/[:.]/g, '-');
    const filename = `visualify-${stamp}.png`;

    // Download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Download failed', err);
    alert('Download failed. If you are on mobile, try tapping Generate first and then Download again.');
  }
});

// Optional: update preview live as user types (non-blocking)
let liveTimer = null;
tweetInput.addEventListener('input', () => {
  // small debounce to avoid excessive DOM updates
  clearTimeout(liveTimer);
  liveTimer = setTimeout(() => {
    // Only update the preview text (without re-rendering image)
    if (cardText) cardText.textContent = tweetInput.value;
  }, 200);
});

// Initialize badge hidden
renderBadge('none');

// Make sure initial UI state matches HTML defaults
// If card has class "light" keep it, otherwise add light by default
if (!card.classList.contains('light') && !card.classList.contains('dark')) {
  card.classList.add('light');
}
