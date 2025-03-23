const date = import.meta.env.VITE_BUILD_DATE

export default function Hi() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8', textAlign: 'center' }}>
      <h1>About PWA Remix</h1>
      <div>
        <strong>/about</strong>
        {' '}
        route, built at:
        {date}
      </div>
      <br />
      <a href="/">Go Home</a>
    </div>
  )
}
