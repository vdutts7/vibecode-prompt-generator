// Load platforms
const platforms = [
  { id: "lovable", name: "Lovable", domain: "lovable.app", topic: "lovable-app" },
  { id: "v0", name: "V0", domain: "vercel.app", topic: "v0-app" },
  { id: "blink", name: "Blink", domain: "blink.new", topic: "blink-app" },
  { id: "base44", name: "Base44", domain: "base44.com", topic: "base44-app" },
  { id: "bolt", name: "Bolt", domain: "bolt.new", topic: "bolt-app" },
  { id: "mgx", name: "MGX", domain: "mgx.dev", topic: "mgx-app" },
  { id: "leap", name: "Leap", domain: "leap.new", topic: "leap-app" },
  { id: "createanything", name: "CreateAnything", domain: "createanything.com", topic: "anything-app" },
  { id: "rork", name: "Rork", domain: "rork.app", topic: "rork-app" },
  { id: "orchids", name: "Orchids", domain: "orchids.app", topic: "orchids-app" },
  { id: "libra", name: "Libra", domain: "libra.dev", topic: "libra-app" },
  { id: "vibecodeapp", name: "VibeCodeApp", domain: "vibecodeapp.com", topic: "vibecodeapp-app" },
  { id: "reflex", name: "Reflex", domain: "reflex.dev", topic: "reflex-app" },
  { id: "emergent", name: "Emergent", domain: "emergent.sh", topic: "emergent-app" },
  { id: "googleaistudio", name: "Google AI Studio", domain: "google.com", topic: "googleaistudio-app" },
  { id: "builderio", name: "Builder.io", domain: "builder.io", topic: "builderio-app" }
];

// Populate platform dropdown
const platformSelect = document.getElementById('platform');
platforms.forEach(p => {
  const option = document.createElement('option');
  option.value = p.id;
  option.textContent = `${p.name} (${p.domain})`;
  platformSelect.appendChild(option);
});

// Slugify function
function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Load template
async function loadTemplate() {
  const response = await fetch('./template.md');
  return await response.text();
}

// Generate prompt
document.getElementById('promptForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const platformId = document.getElementById('platform').value;
  const instructions = document.getElementById('instructions').value;
  
  const platform = platforms.find(p => p.id === platformId);
  const slug = slugify(title);
  const deploymentUrl = `https://${slug}-vd7.${platform.domain}`;
  const shortName = title.length > 12 ? title.substring(0, 12) : title;
  const tagline = description.split('.')[0];
  
  let template = await loadTemplate();
  
  // Replace variables
  template = template
    .replace(/\{\{PROJECT_TITLE\}\}/g, title)
    .replace(/\{\{PROJECT_DESCRIPTION\}\}/g, description)
    .replace(/\{\{PLATFORM_NAME\}\}/g, platform.name)
    .replace(/\{\{PLATFORM_DOMAIN\}\}/g, platform.domain)
    .replace(/\{\{PLATFORM_TOPIC\}\}/g, platform.topic)
    .replace(/\{\{slugified-title\}\}/g, slug)
    .replace(/\{\{DEPLOYMENT_URL\}\}/g, deploymentUrl)
    .replace(/\{\{SHORT_NAME\}\}/g, shortName)
    .replace(/\{\{TAGLINE\}\}/g, tagline)
    .replace(/\{\{PROJECT_SPECIFIC_INSTRUCTIONS\}\}/g, instructions || '(No additional instructions provided)');
  
  // Show output
  document.getElementById('promptOutput').textContent = template;
  document.getElementById('output').classList.remove('hidden');
  
  // Scroll to output
  document.getElementById('output').scrollIntoView({ behavior: 'smooth' });
});

// Toast notification
function showToast(title, description) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-description">${description}</div>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Copy to clipboard
document.getElementById('copyBtn').addEventListener('click', async () => {
  const text = document.getElementById('promptOutput').textContent;
  
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard', 'Prompt is ready to paste into your platform');
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Copied to clipboard', 'Prompt is ready to paste into your platform');
    } catch (err) {
      showToast('Copy failed', 'Please manually select and copy the text');
    }
    document.body.removeChild(textArea);
  }
});
