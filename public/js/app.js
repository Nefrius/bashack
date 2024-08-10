document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://api.lanyard.rest/v1/users/1127276483359014963';
  const statusIndicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');

  function updateStatus() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.data && data.data.discord_status) {
          const status = data.data.discord_status;
          switch (status) {
            case 'online':
              statusIndicator.classList.replace('bg-gray-500', 'bg-green-500');
              statusText.textContent = 'Çevrimiçi';
              break;
            case 'dnd':
              statusIndicator.classList.replace('bg-gray-500', 'bg-red-500');
              statusText.textContent = 'Rahatsız Etmeyin';
              break;
            case 'idle':
              statusIndicator.classList.replace('bg-gray-500', 'bg-yellow-500');
              statusText.textContent = 'Boşta';
              break;
            case 'offline':
              statusIndicator.classList.replace('bg-gray-500', 'bg-gray-500');
              statusText.textContent = 'Çevrimdışı';
              break;
            default:
              statusIndicator.classList.replace('bg-gray-500', 'bg-gray-500');
              statusText.textContent = 'Bilinmiyor';
          }
        } else {
          statusIndicator.classList.replace('bg-gray-500', 'bg-gray-500');
          statusText.textContent = 'Hata alındı';
        }
      })
      .catch(error => {
        console.error('Hata:', error);
        statusIndicator.classList.replace('bg-gray-500', 'bg-gray-500');
        statusText.textContent = 'Hata';
      });
  }

  updateStatus();
  setInterval(updateStatus, 60000); // 60 saniyede bir güncelle
});

window.addEventListener("load", function() {
  setTimeout(function() {
    document.getElementById("loading").classList.add("hide");
    document.getElementById("content").classList.remove("hidden");
  }, 1000);
});