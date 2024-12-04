import "./globals.css";

export const metadata = {
  title: "RoleMaster",
  description: `VRV Security&apos; Frontend Developer Intern Assignment`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
