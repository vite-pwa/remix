import type { PluginOption } from 'vite'
import { VitePWA as PWAPlugin } from 'vite-plugin-pwa'
import type { ReactRouterPWAOptions } from '../types'
import { configurePWA } from '../config'
import type { BasePWAContext } from '../context'
import { BuildPlugin } from './build'
import { SWPlugin } from './sw'

export function ReactRouterPlugin(ctx: BasePWAContext) {
  return (config: ReactRouterPWAOptions = {}) => {
    const pwaOptions = configurePWA(ctx, config, true)
    return [
      PWAPlugin(pwaOptions),
      SWPlugin(ctx),
      BuildPlugin(ctx),
    ] as PluginOption
  }
}

export function RemixPlugin(ctx: BasePWAContext) {
  return (config: ReactRouterPWAOptions = {}) => {
    const pwaOptions = configurePWA(ctx, config)
    return [
      PWAPlugin(pwaOptions),
      SWPlugin(ctx),
      BuildPlugin(ctx),
    ] as PluginOption
  }
}
