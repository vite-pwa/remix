import type { Preset } from '@remix-run/dev'
import type { RemixPWAContext } from '../context'

export function RemixPreset(ctx: RemixPWAContext) {
  return () => {
    return {
      name: '@vite-pwa/remix/preset',
      remixConfig() {
        return {
          async buildEnd() {
            ctx.build = true
            await ctx.api?.generateSW()
          },
        }
      },
      remixConfigResolved({ remixConfig }) {
        ctx.remixResolvedConfig = remixConfig
        ctx.configured = true
      },
    } satisfies Preset
  }
}
