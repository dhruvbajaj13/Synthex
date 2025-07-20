document.addEventListener("DOMContentLoaded", () => {
  // Load saved API key
  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    if (result.geminiApiKey) {
      document.getElementById("api-key").value = result.geminiApiKey;
    }
  });

  // Save API key
  document.getElementById("save-button").addEventListener("click", () => {
    const apiKey = document.getElementById("api-key").value.trim();

    if (apiKey) {
      chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
        if (chrome.runtime.lastError) {
          alert("Error saving key: " + chrome.runtime.lastError.message);
          return;
        }

        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";

        // Try to close the tab after a short delay
        setTimeout(() => {
          window.close(); // works in most cases
        }, 1000);
      });
    } else {
      alert("Please enter a valid API key.");
    }
  });
});
