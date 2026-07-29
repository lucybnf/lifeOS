import { type RefObject } from 'react';
import { MaterialIcon } from './MaterialIcon';

type ProfileMenuProps = {
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onToggle: () => void;
};

export function ProfileMenu({ isOpen, menuRef, onToggle }: ProfileMenuProps) {
  return (
    <div className="profile-menu" ref={menuRef}>
      <button
        className="profile-button"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="profile-dropdown"
        onClick={onToggle}
      >
        <MaterialIcon name="person" />
        <span className="profile-button__text">Mi perfil</span>
      </button>
      <div className="profile-dropdown" id="profile-dropdown" role="menu" hidden={!isOpen}>
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
  );
}
