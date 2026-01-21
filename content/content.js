// content.js

let isReaderActive = false;

// Listen for messages from Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'TOGGLE_READER') {
    toggleReader();
  } else if (request.action === 'SET_THEME') {
    updateTheme(request.theme);
  }
});

function toggleReader() {
  const existingHost = document.getElementById('zen-reader-host');
  if (existingHost) {
    // If active, remove it
    existingHost.remove();
    isReaderActive = false;
    document.body.style.overflow = ''; // Restore original scrolling
  } else {
    // If not active, create it
    initReader();
  }
}

function initReader() {
  if (typeof Readability === 'undefined') {
    console.error('ZenReader: Readability library not loaded.');
    return;
  }

  // Clone document to avoid modifying the original DOM during parsing
  const documentClone = document.cloneNode(true);
  
  // Parse content using Readability
  let article;
  try {
    article = new Readability(documentClone).parse();
  } catch (e) {
    console.error('ZenReader: Readability parsing failed', e);
  }

  if (!article) {
    alert('ZenReader: Unable to extract content from this page.');
    return;
  }

  createReaderView(article);
}

function createReaderView(article) {
  // Create Shadow Host
  const host = document.createElement('div');
  host.id = 'zen-reader-host';
  
  // Get saved theme preference
  chrome.storage.local.get(['theme'], (result) => {
    const theme = result.theme || 'light';
    host.setAttribute('data-theme', theme);
  });
  
  // Attach Shadow DOM
  const shadow = host.attachShadow({ mode: 'open' });

  // Inject Styles (from web accessible resources)
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('styles/reader.css');
  shadow.appendChild(link);

  // Create Main Container
  const container = document.createElement('div');
  container.id = 'zen-reader-container';
  
  // Close Button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.title = 'Close Reader View';
  closeBtn.onclick = toggleReader;
  container.appendChild(closeBtn);

  // Content Wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'reader-content';
  
  // Title
  const title = document.createElement('h1');
  title.textContent = article.title;
  contentWrapper.appendChild(title);

  // Byline / Excerpt (if available)
  if (article.byline) {
    const byline = document.createElement('p');
    byline.style.fontStyle = 'italic';
    byline.style.opacity = '0.8';
    byline.textContent = article.byline;
    contentWrapper.appendChild(byline);
  }

  // Article Content
  const contentDiv = document.createElement('div');
  contentDiv.innerHTML = article.content;
  contentWrapper.appendChild(contentDiv);

  container.appendChild(contentWrapper);
  shadow.appendChild(container);

  // Append Host to Body
  document.body.appendChild(host);
  
  // Disable Body Scroll on original page
  document.body.style.overflow = 'hidden';
  isReaderActive = true;
}

function updateTheme(theme) {
  const host = document.getElementById('zen-reader-host');
  if (host) {
    host.setAttribute('data-theme', theme);
  }
  
  // Persist theme setting
  chrome.storage.local.set({ theme: theme });
}
