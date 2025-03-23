/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { HydratedRouter } from 'react-router/dom'
import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'

// something weird with import.meta.env with remix
if (import.meta.env.VITE_PUBLIC_VIRTUAL_PWA_MODULE === 'true')
  import('./pwa')

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  )
})
