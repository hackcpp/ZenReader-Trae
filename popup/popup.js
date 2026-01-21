document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const themeBtns = document.querySelectorAll('.theme-btn');

  // Load saved theme
  chrome.storage.local.get(['theme'], (result) => {
    const currentTheme = result.theme || 'light';
    updateActiveThemeBtn(currentTheme);
  });

  // Toggle Reader Mode
  toggleBtn.addEventListener('click', () => {
    sendMessageToActiveTab({ action: 'TOGGLE_READER' });
    // Close popup after toggling? Optional. 
    // window.close(); 
  });

  // Theme Switching
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      
      // Update UI
      updateActiveThemeBtn(theme);
      
      // Save to storage
      chrome.storage.local.set({ theme: theme });
      
      // Notify content script
      sendMessageToActiveTab({ action: 'SET_THEME', theme: theme });
    });
  });

  function updateActiveThemeBtn(theme) {
    themeBtns.forEach(btn => {
      if (btn.dataset.theme === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function sendMessageToActiveTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        // We can't verify if the content script is injected here easily without sending a message and waiting for response.
        // But for this simple extension, we assume it matches <all_urls>.
        // However, on chrome:// urls or empty tabs it might fail.
        chrome.tabs.sendMessage(tabs[0].id, message).catch(err => {
          console.warn('Could not send message to tab. Is it a valid web page?', err);
        });
      }
    });
  }
});
