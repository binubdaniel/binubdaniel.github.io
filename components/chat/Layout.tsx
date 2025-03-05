
// components/chat/Layout.tsx
interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  isSidebarOpen: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  sidebar, 
}) => (
  <div className="flex h-screen overflow-hidden bg-background">
    {sidebar}
    <div
      className={`
        flex flex-col w-full
        lg:ml-80 
        transition-all duration-300
      `}
    >
      {children}
    </div>
  </div>
);