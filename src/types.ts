import type { PWAAssetsOptions, VitePWAOptions } from 'vite-plugin-pwa'

export interface RemixPWAAssets extends PWAAssetsOptions {
  generateDtsIcons?: true
}
export interface RemixPWAOptions extends Partial<Omit<VitePWAOptions, 'pwaAssets'>> {
  pwaAssets?: RemixPWAAssets
}
