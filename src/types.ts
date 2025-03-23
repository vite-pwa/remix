import type { VitePWAOptions } from 'vite-plugin-pwa'

export interface ReactRouterPWAInjectManifest {
  /**
   * Remove old assets once the new service worker activated?
   *
   * @default true
   */
  cleanupOutdatedCaches?: boolean
  /**
   * This option is about the Automatic reload when a new service worker is activated.
   *
   * If you use any Vite PWA virtual module, you **MUST** to set this option to `true`.
   *
   * With `auto`, the page will be reloaded without using a Vite PWA virtual module.
   *
   * **NOTE**: this option will be ignored if `registerType` is `autoUpdate` in your PWA options: the default value is `prompt`.
   *
   * @default 'auto'
   * @see https://vite-pwa-org.netlify.app/guide/auto-update.html
   */
  clientsClaimMode?: 'auto' | boolean
}

export interface ReactRouterPWASWOptions {
  /**
   * Options when using `@vite-pwa/remix/sw` module in your custom service worker
   */
  injectManifest?: ReactRouterPWAInjectManifest
  // Add Remix-specific workbox options here: runtime caching for example
}

export interface ReactRouterPWAOptions extends Partial<VitePWAOptions> {
  reactRouter?: ReactRouterPWASWOptions
}
