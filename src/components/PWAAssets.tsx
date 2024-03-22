import { pwaAssetsHead } from 'virtual:pwa-assets/head'
import { PWAManifest } from './PWAManifest'

export function PWAAssets() {
  return (
    <>
      {pwaAssetsHead.themeColor
        ? (
          <meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
          )
        : null}
      {pwaAssetsHead.links.map(({ id, ...link }) => (
        <link key={id} {...link} />
      ))}
      <PWAManifest />
    </>
  )
}
