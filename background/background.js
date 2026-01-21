// background.js

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('ZenReader extension installed.');
});

// Example: Listen for messages from content scripts or popup if needed
// Currently, popup communicates directly with content script, 
// but we can keep this for future expansion (e.g. context menus).
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'BG_LOG') {
    console.log('Background Log:', request.message);
  }
});
