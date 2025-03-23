import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { PWAManifest } from '@vite-pwa/remix/components'

// export async function loader() {
//   return json({
//     ENV: {
//       VITE_VIRTUAL_PWA_MODULE: process.env.VITE_VIRTUAL_PWA_MODULE,
//     },
//   })
// }
//
export function Layout({ children }: { children: React.ReactNode }) {
  // const data = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link href="/favicon.ico" rel="icon" sizes="48x48" />
        <link href="/favicon.svg" rel="icon" sizes="any" type="image/svg+xml" />
        <link href="/apple-touch-icon-180x180.png" rel="apple-touch-icon" />
        <Meta />
        <PWAManifest />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
                data.ENV,
            )}`,
          }}
        /> */}
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
