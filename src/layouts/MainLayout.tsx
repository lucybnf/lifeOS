import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { menuItems } from '../modules/navigation/menuItems';

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const [activePage, setActivePage] = useState(menuItems[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
        setIsProfileOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsSidebarCollapsed(true);
      }

      if (window.innerWidth > 900) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app-shell" data-sidebar-collapsed={isSidebarCollapsed} data-sidebar-open={isSidebarOpen}>
      <Sidebar
        activeItemKey={activePage.key}
        isCollapsed={isSidebarCollapsed}
        items={menuItems}
        onClose={closeSidebar}
        onSelectItem={setActivePage}
        onToggleCollapse={() => setIsSidebarCollapsed((currentValue) => !currentValue)}
      />

      <button className="sidebar-backdrop" type="button" aria-label="Cerrar menú principal" onClick={closeSidebar} hidden={!isSidebarOpen} />

      <section className="workspace" aria-label="Área principal">
        <Topbar
          currentPageLabel={activePage.label}
          isProfileOpen={isProfileOpen}
          isSidebarOpen={isSidebarOpen}
          profileMenuRef={profileMenuRef}
          onToggleProfile={() => setIsProfileOpen((currentValue) => !currentValue)}
          onToggleSidebar={() => setIsSidebarOpen((currentValue) => !currentValue)}
        />

        <main className="main-content" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </section>
    </div>
  );
}
