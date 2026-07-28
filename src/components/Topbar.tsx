import { type RefObject } from 'react';
import { MaterialIcon } from './MaterialIcon';
import { ProfileMenu } from './ProfileMenu';

type TopbarProps = {
  currentPageLabel: string;
  isProfileOpen: boolean;
  isSidebarOpen: boolean;
  profileMenuRef: RefObject<HTMLDivElement | null>;
  onToggleProfile: () => void;
  onToggleSidebar: () => void;
};

export function Topbar({
  currentPageLabel,
  isProfileOpen,
  isSidebarOpen,
  profileMenuRef,
  onToggleProfile,
  onToggleSidebar,
}: TopbarProps) {
  return (
    <header className="topbar">
      <button
        className="menu-toggle"
        type="button"
        aria-controls="sidebar"
        aria-expanded={isSidebarOpen}
        aria-label={isSidebarOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
        onClick={onToggleSidebar}
      >
        <MaterialIcon name="menu" />
      </button>
      <div className="topbar__title">
        <p className="topbar__label">Pantalla actual</p>
        <h2 id="current-page-title">{currentPageLabel}</h2>
      </div>

      <form className="topbar__search" role="search" aria-label="Buscar y filtrar opciones del menú" onSubmit={(event) => event.preventDefault()}>
        <MaterialIcon name="search" />
        <input id="menu-search" type="search" placeholder="Buscar..." autoComplete="off" aria-label="Buscar" />
        <button className="filter-chip" type="button" aria-label="Filtrar opciones">
          <MaterialIcon name="tune" />
          Filtrar
        </button>
      </form>

      <ProfileMenu isOpen={isProfileOpen} menuRef={profileMenuRef} onToggle={onToggleProfile} />
    </header>
  );
}
