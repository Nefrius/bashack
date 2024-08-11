document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.lanyard.rest/v1/users/1127276483359014963';
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    
    
  
    function checkMobile() {
      const warning = document.getElementById('mobile-warning');
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
      // Uyarıyı sadece mobil cihazlarda gösterir
      if (isMobile) {
          warning.style.display = 'flex';
      } else {
          warning.style.display = 'none';
      }
  }
  
  document.addEventListener("DOMContentLoaded", checkMobile);
  window.addEventListener("resize", checkMobile);
  
  updateStatus();
  
  
  
  });
  
  const cookieAlert = document.getElementById('cookie-alert');
  const denyBtn = document.getElementById('deny-btn');
  const acceptBtn = document.getElementById('accept-btn');
  
  // Sayfa yüklendiğinde, kullanıcı daha önce "Kabul Et" butonuna basmış mı kontrol et
  if (localStorage.getItem('cookie-consent') === 'accepted') {
    cookieAlert.style.display = 'none';
  } else if (localStorage.getItem('cookie-consent') === 'denied') {
    // Kullanıcı "Reddet" butonuna basmışsa sayfayı yönlendir
    window.location.href = 'https://example.com/';  // Reddet butonuna basıldığında yönlendirilecek URL
  }
  
  denyBtn.addEventListener('click', function() {
    // "Reddet" butonuna basıldığında localStorage'da 'denied' değeri sakla ve sayfayı yönlendir
    localStorage.setItem('cookie-consent', 'denied');
    window.location.href = 'https://example.com/';  // Reddet butonuna basıldığında yönlendirilecek URL
  });
  
  acceptBtn.addEventListener('click', function() {
    // "Kabul Et" butonuna basıldığında localStorage'da 'accepted' değeri sakla ve alert kutusunu gizle
    localStorage.setItem('cookie-consent', 'accepted');
    cookieAlert.classList.add('opacity-0');
  
    // 0.5 saniye sonra tamamen gizle
    setTimeout(function() {
      cookieAlert.style.display = 'none';
    }, 500);
  });
  
  
  
  function updateDiscordStatus() {
    // Lanyard API'sinden veriyi çek
    fetch('https://api.lanyard.rest/v1/users/1127276483359014963')
      .then(response => response.json())
      .then(data => {
        const discordData = data.data;
        const status = discordData.discord_status;
        const profilePicture = discordData.discord_user.avatar
          ? `https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png`
          : '/docs/images/people/profile-picture-5.jpg';
        const username = `${discordData.discord_user.username}#${discordData.discord_user.discriminator}`;
        const customStatus = discordData.activities.find(activity => activity.type === 4)?.state || 'No status';
  
        // Profil fotoğrafını ve adını güncelle
        document.getElementById('profile-picture').src = profilePicture;
        document.getElementById('username').textContent = username;
        document.getElementById('status-text').textContent = customStatus;
  
        // Duruma göre renkleri ayarla
        const statusCircle = document.getElementById('status-circle');
        statusCircle.classList.remove('bg-green-400', 'bg-yellow-400', 'bg-red-500', 'bg-gray-400');
  
        switch(status) {
          case 'online':
            statusCircle.classList.add('bg-green-400');
            break;
          case 'idle':
            statusCircle.classList.add('bg-yellow-400');
            break;
          case 'dnd':
            statusCircle.classList.add('bg-red-500');
            break;
          case 'offline':
          default:
            statusCircle.classList.add('bg-gray-400');
            break;
        }
      })
      .catch(error => console.error('API verisi çekilemedi:', error));
  }
  
  // 15 saniyede bir veriyi güncelle
  updateDiscordStatus();
  setInterval(updateDiscordStatus, 15000);
  
  
  window.addEventListener("load", function() {
    setTimeout(function() {
      document.getElementById("loading").classList.add("hide");
      document.getElementById("content").classList.remove("hidden");
    }, 1000);
  });
  
  module.exports = (req, res) => {
    res.status(404).json({ message: 'Not Found' });
  };
  
  function playClickSound() {
    var audio = new Audio('click.wav'); // Ses dosyasının yolunu belirtin
    audio.play();
  }
  
  document.addEventListener('click', playClickSound);