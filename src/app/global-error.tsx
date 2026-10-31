'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{ background: '#1c1a17', color: '#f5f3ef', fontFamily: 'system-ui, sans-serif' }}
      >
        <main
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.875rem', fontWeight: 600 }}>Xoboard could not load.</h1>
          <p style={{ maxWidth: '28rem', color: '#b5b0a8' }}>
            An unexpected problem stopped the site from loading. Try again in a moment. If it keeps
            happening, contact support and include the reference code below.
          </p>
          {error.digest ? (
            <p style={{ color: '#b5b0a8', fontFamily: 'monospace' }}>Reference: {error.digest}</p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              borderRadius: '9999px',
              background: '#e8b44a',
              color: '#1c1a17',
              border: 'none',
              padding: '0.75rem 1.5rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
