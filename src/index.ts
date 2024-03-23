import type { RemixPWAContext } from './context'
import { RemixPreset } from './plugins/preset'
import { MainPlugin } from './plugins'

export * from './types'

export function RemixVitePWA() {
  const ctx: RemixPWAContext = {
    remixOptions: undefined!,
    remixResolvedConfig: undefined!,
    api: undefined,
    build: false,
  }

  return {
    RemixVitePWAPlugin: MainPlugin(ctx),
    RemixPWAPreset: RemixPreset(ctx),
  }
}
