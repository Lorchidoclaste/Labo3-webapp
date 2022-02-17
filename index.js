if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
    }).catch(function(error) {
      });
    };
  
    let deferredPrompt;
   
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    installApp();
    
      appButton.addEventListener('click', function() {
        deferredPrompt.prompt();
      })
  
  });
  
  
  function installApp() {
    const fenetre = document.getElementById('message')
    const toast = new bootstrap.Toast(fenetre, {delay: 6000})
    toast.show();
  };