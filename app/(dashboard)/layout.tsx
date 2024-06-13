import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <div className="hidden md:flex w-24 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <Toaster />
      {/* <Navbar /> */}
      <main className=" md:pl-24 pt-4 h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </main>
    </div>
  );
}
