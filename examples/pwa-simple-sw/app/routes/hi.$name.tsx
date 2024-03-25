import { json, useLoaderData } from '@remix-run/react'

interface Params {
  name: string
}

export function loader({ params }: { params: Params }) {
  return json(params)
}

const date = import.meta.env.VITE_BUILD_DATE

export default function Hi() {
  const params = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8', textAlign: 'center' }}>
      <h1>Hi PWA Remix</h1>
      <div>
        <strong>/hi</strong>
        {' '}
        route, built at:
        {date}
      </div>
      <p>
        Hi:
        {params.name}
      </p>
      <br />
      <a href="/">Go Home</a>
    </div>
  )
}
