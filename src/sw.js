if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../dist/service-worker').then(res => {
      console.log('service-worker ok');
    }).catch(err => {
      console.log('service-worker error');
    })
  })
}
