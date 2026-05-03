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
      </head>
      <body style={{ margin: 0, padding: 0, background: "#05080f" }}>
        {children}
      </body>
    </html>
  );
}
