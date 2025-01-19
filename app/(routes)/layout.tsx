import MainLayout from "@/components/mainLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MainLayout>
        <ToastContainer />
        {children}
      </MainLayout>
    </SidebarProvider>
  );
}
