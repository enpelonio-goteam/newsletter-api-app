export const metadata = {
  title: "Newsletter Builder API",
  description: "Build newsletter HTML from structured JSON input.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
