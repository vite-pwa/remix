import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix PWA App' },
    { name: 'description', content: 'Welcome to Remix PWA!' },
  ]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Remix</h1>
      <pre>{import.meta.env.VITE_BUILD_DATE}</pre>
    </div>
  )
}
