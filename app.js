// Tab switching
const newAppTab = document.getElementById('newAppTab');
const existingAppTab = document.getElementById('existingAppTab');
const newAppForm = document.getElementById('newAppForm');
const existingAppForm = document.getElementById('existingAppForm');

newAppTab.setAttribute('data-active', 'true');

newAppTab.addEventListener('click', () => {
  newAppTab.setAttribute('data-active', 'true');
  existingAppTab.setAttribute('data-active', 'false');
  newAppForm.classList.remove('hidden');
  existingAppForm.classList.add('hidden');
});

existingAppTab.addEventListener('click', () => {
  existingAppTab.setAttribute('data-active', 'true');
  newAppTab.setAttribute('data-active', 'false');
  existingAppForm.classList.remove('hidden');
  newAppForm.classList.add('hidden');
});

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

// Populate platform dropdowns
const platformSelects = [
  document.getElementById('platform'),
  document.getElementById('existingPlatform')
];

platformSelects.forEach(select => {
  platforms.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = `${p.name} (${p.domain})`;
    select.appendChild(option);
  });
});

// Slugify function
function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Load template based on form type
async function loadTemplate(isExisting = false) {
  const templateFile = isExisting ? './template-existing-app.md' : './template-new-app.md';
  const response = await fetch(templateFile);
  return await response.text();
}

// Generate prompt function
async function generatePrompt(formId) {
  const isExisting = formId === 'existingAppForm';
  const prefix = isExisting ? 'existing' : '';
  
  const title = document.getElementById(prefix + (prefix ? 'T' : 't') + 'itle').value;
  const description = document.getElementById(prefix + (prefix ? 'D' : 'd') + 'escription').value;
  const platformId = document.getElementById(prefix + (prefix ? 'P' : 'p') + 'latform').value;
  const instructions = document.getElementById(prefix + (prefix ? 'I' : 'i') + 'nstructions').value;
  
  const platform = platforms.find(p => p.id === platformId);
  const slug = slugify(title);
  const deploymentUrl = `https://${slug}-vd7.${platform.domain}`;
  const shortName = title.length > 12 ? title.substring(0, 12) : title;
  const tagline = description.split('.')[0];
  
  let template = await loadTemplate(isExisting);
  
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
}

// Form submit handlers
document.getElementById('newAppForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  await generatePrompt('newAppForm');
});

document.getElementById('existingAppForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  await generatePrompt('existingAppForm');
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
