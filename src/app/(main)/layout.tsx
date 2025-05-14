import { AuthProvider } from "@/contexts";
import { VnToast } from "@/components";
import { VnBreadCrumb } from "@/components";
import { Header, Sidebar } from "./_components";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <AuthProvider>
      <div className="bg-primary-200 w-screen h-screen flex overflow-hidden">
        <Sidebar />

        <div className="h-full w-full flex flex-col overflow-hidden">
          <Header />
          <div className="bg-white w-full h-full shadow-2xl rounded-tl-2xl p-5 flex flex-col gap-4 overflow-hidden">
            <VnBreadCrumb />
            {children}
          </div>
        </div>
        <VnToast />
      </div>
    </AuthProvider>
  );
}
