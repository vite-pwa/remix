import { pwaInfo } from 'virtual:pwa-info'

export function PWAManifest() {
  if (!pwaInfo)
    return null

  return (
    <>
      <link
        rel="manifest"
        href={pwaInfo.webManifest.href}
        crossOrigin={pwaInfo.webManifest.useCredentials ? 'use-credentials' : undefined}
      />
    </>
  )
}
