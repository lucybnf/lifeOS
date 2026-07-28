import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { MaterialIcon } from '../components/MaterialIcon';
import { menuItems } from '../modules/navigation/menuItems';

type MainLayoutProps = {
  children: ReactNode;
};

const normalizeText = (text: string) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export function MainLayout({ children }: MainLayoutProps) {
  const [activePage, setActivePage] = useState(menuItems[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    const query = normalizeText(searchQuery.trim());

    return menuItems.filter((item) => {
      const matchesSearch = normalizeText(item.label).includes(query);
      const matchesFilter = !showOnlyActive || item.key === activePage.key;

      return matchesSearch && matchesFilter;
    });
  }, [activePage.key, searchQuery, showOnlyActive]);

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
      if (window.innerWidth > 860) {
        setIsSidebarOpen(false);
      }
    };

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
    <div className="app-shell" data-sidebar-open={isSidebarOpen}>
      <aside className="sidebar" id="sidebar" aria-label="Menú principal">
        <div className="sidebar__brand">
          <div className="brand-logo" aria-hidden="true">
            <span className="brand-logo__dot" />
          </div>
          <div>
            <p className="brand-eyebrow">Organizador personal</p>
            <h1>LifeOS</h1>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Pantallas de LifeOS">
          {filteredItems.map((item) => {
            const isActive = activePage.key === item.key;

            return (
              <button
                className={`nav-item${isActive ? ' is-active' : ''}`}
                type="button"
                data-page={item.key}
                aria-current={isActive ? 'page' : undefined}
                key={item.key}
                onClick={() => {
                  setActivePage(item);
                  closeSidebar();
                }}
              >
                <MaterialIcon name={item.icon} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <button className="sidebar-backdrop" type="button" aria-label="Cerrar menú principal" onClick={closeSidebar} hidden={!isSidebarOpen} />

      <section className="workspace" aria-label="Área principal">
        <header className="topbar">
          <button
            className="menu-toggle"
            type="button"
            aria-controls="sidebar"
            aria-expanded={isSidebarOpen}
            aria-label={isSidebarOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
            onClick={() => setIsSidebarOpen((currentValue) => !currentValue)}
          >
            <MaterialIcon name="menu" />
          </button>
          <div className="topbar__title">
            <p className="topbar__label">Pantalla actual</p>
            <h2 id="current-page-title">{activePage.label}</h2>
          </div>

          <form className="topbar__search" role="search" aria-label="Buscar y filtrar opciones del menú" onSubmit={(event) => event.preventDefault()}>
            <MaterialIcon name="search" />
            <input
              id="menu-search"
              type="search"
              placeholder="Buscar sección..."
              autoComplete="off"
              aria-label="Buscar sección del menú"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button
              className="filter-chip"
              type="button"
              aria-pressed={showOnlyActive}
              onClick={() => setShowOnlyActive((currentValue) => !currentValue)}
            >
              <MaterialIcon name="tune" />
              Filtrar
            </button>
          </form>

          <div className="profile-menu" ref={profileMenuRef}>
            <button
              className="profile-button"
              type="button"
              aria-haspopup="true"
              aria-expanded={isProfileOpen}
              aria-controls="profile-dropdown"
              onClick={() => setIsProfileOpen((currentValue) => !currentValue)}
            >
              <span className="profile-avatar" aria-hidden="true">L</span>
              <span className="profile-button__text">Mi perfil</span>
              <MaterialIcon name="expand_more" />
            </button>
            <div className="profile-dropdown" id="profile-dropdown" role="menu" hidden={!isProfileOpen}>
              <button type="button" role="menuitem">
                <MaterialIcon name="lock" />
                Privacidad
              </button>
              <button type="button" role="menuitem">
                <MaterialIcon name="settings" />
                Configuración
              </button>
              <button type="button" role="menuitem">
                <MaterialIcon name="logout" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>

        <main className="main-content" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </section>
    </div>
  );
}
