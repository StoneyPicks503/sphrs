export const metadata = {
  title: "SPHRS — AI MLB Home Run Intelligence",
  description: "AI-powered MLB home run prop analysis. BvP · Home/Away Splits · Weather · Strike Zone · 10,000× Monte Carlo simulation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#05080f" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚾</text></svg>" />
        <style>{`
          html, body { margin: 0; padding: 0; min-height: 100vh; }
          body {
            background-color: #05080f;
            background-image: url('/baseball-bg.jpg');
            background-size: cover;
            background-position: center top;
            background-attachment: fixed;
            background-repeat: no-repeat;
          }
          body::before {
            content: '';
            position: fixed;
            inset: 0;
            background: linear-gradient(
              160deg,
              rgba(4, 8, 18, 0.93) 0%,
              rgba(5, 10, 22, 0.88) 40%,
              rgba(6, 12, 24, 0.82) 100%
            );
            z-index: 0;
            pointer-events: none;
          }
          #__next, main, [data-nextjs-scroll-focus-boundary] {
            position: relative;
            z-index: 1;
          }
        `}</style>
      </head>
      <body>
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
