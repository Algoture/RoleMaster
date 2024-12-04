import Sidebar from "./Components/Sidebar";
import "./globals.css";
import { ResizeProvider } from "./utils/ResizeContext";

export const metadata = {
  title: "RoleMaster",
  description: `VRV Security&apos; Frontend Developer Intern Assignment`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased xl:ml-56">
        <ResizeProvider>
          <Sidebar />
          {children}
        </ResizeProvider>
      </body>
    </html>
  );
}
