import React, { PureComponent } from 'react';

class OfflineSupport extends PureComponent {
  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then(() => console.log('service worker registered.'))
        .catch(err => console.warn('service worker registration failed', err));
    }
  }

  render() {
    return null;
  }
}

export default OfflineSupport;
