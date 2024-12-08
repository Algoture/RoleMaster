import { Toaster } from "sonner";
import { Sidebar } from "./Components/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";
import "./globals.css";
export const metadata = {
  title: "RoleMaster",
  description: `VRV Security&apos; Frontend Developer Intern Assignment`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"antialiased transition-all"}>
        <SidebarProvider>
          <Sidebar />
          <Toaster position="bottom-left" richColors />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
