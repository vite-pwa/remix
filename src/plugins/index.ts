import type { PluginOption } from 'vite'
import { VitePWA as PWAPlugin } from 'vite-plugin-pwa'
import type { RemixPWAOptions } from '../types'
import { configurePWA } from '../config'
import type { RemixPWAContext } from '../context'
import { BuildPlugin } from './build'
import { SWPlugin } from './sw'

export function MainPlugin(ctx: RemixPWAContext) {
  return (config: RemixPWAOptions = {}) => {
    const pwaOptions = configurePWA(ctx, config)
    return [
      PWAPlugin(pwaOptions),
      SWPlugin(ctx),
      BuildPlugin(ctx),
    ] as PluginOption
  }
}
