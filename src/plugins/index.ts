import type { PluginOption } from 'vite'
import { VitePWA as PWAPlugin } from 'vite-plugin-pwa'
import type { ReactRouterPWAOptions } from '../types'
import { configurePWA } from '../config'
import type { BasePWAContext } from '../context'
import { BuildPlugin } from './build'
import { SWPlugin } from './sw'

export function MainPlugin(ctx: BasePWAContext, isReactRouter = false) {
  return (config: ReactRouterPWAOptions = {}) => {
    const pwaOptions = configurePWA(ctx, config, isReactRouter)
    return [
      PWAPlugin(pwaOptions),
      SWPlugin(ctx),
      BuildPlugin(ctx),
    ] as PluginOption
  }
}
