import type { VitePWAOptions } from 'vite-plugin-pwa'

export interface RemixPWAOptions extends Partial<VitePWAOptions> {
  remix?: {
    // Add Remix-specific options here: runtime caching for example
  }
}
