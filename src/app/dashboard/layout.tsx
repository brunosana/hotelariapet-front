import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: 'flex', maxWidth: '100vw', maxHeight: '100vh', overflow: 'hidden' }}>
        <Menu />
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }} >
          <Header />
          {children}
        </div>
    </div>
  );
}