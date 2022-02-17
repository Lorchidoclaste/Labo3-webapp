self.addEventListener('install', (e) => {
    console.log('Installation v1');
    e.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          'page2_nointernet.html',
            'favicon.ico',
            'index.html',
            'index.js',
            'icone-192x192.png',
            'icone-512x512.png',
            'images/1.jpg',
            'images/2.jpeg',
            'images/3.jpg',
            'bootstrap-5.1.3-dist/css/bootstrap.min.css',
            'icons-1.7.2/font/bootstrap-icons.css',
            'bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js'
        ]);
      })
    );
  });
  
self.addEventListener('fetch', function (event) {
  console.log("Fetching ..." + event.request.url);
  event.respondWith(ol(event.request).catch(() => PageHorsLigne()));
});


function ol(request) {
  return fromCache(request).catch(() => fetch(request));
};

function fromCache(request) {
  return caches.open('v1').then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function PageHorsLigne() {
  return caches.match("page2_nointernet.html");
}


this.addEventListener('sync', function (event) {
  console.log("received: " + event);
  if (event.tag == 'NotifBackInternet') {
      console.log("Internet Works");
      event.waitUntil(envoyerNotification());
  }
});


function envoyerNotification() {
  if (Notification.permission === 'granted') {
      var options = {
          body: '',
          requireInteraction: true
      };

      self.registration.showNotification('Le site is up', options);
  } else {
      console.log("Site en ligne.");
  }

}