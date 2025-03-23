import type { MetaFunction } from 'react-router'

export const meta: MetaFunction = () => {
  return [
    { title: 'React Router PWA App' },
    { name: 'description', content: 'Welcome to Remix PWA!' },
  ]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8', textAlign: 'center' }}>
      <h1>Welcome to PWA React Router</h1>
      <pre>{import.meta.env.VITE_BUILD_DATE}</pre>
      <a href="/about">About</a>
      <br />
      <a href="/hi/Dummy">Hi Dummy</a>
    </div>
  )
}
