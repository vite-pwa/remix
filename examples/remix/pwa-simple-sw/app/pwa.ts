import { registerSW } from 'virtual:pwa-register'

// if (window.ENV.VITE_VIRTUAL_PWA_MODULE) {
registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    console.log('SW registered: ', swScriptUrl)
  },
  onOfflineReady() {
    console.log('PWA application ready to work offline')
  },
})
// }
