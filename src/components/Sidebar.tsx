import { MaterialIcon } from './MaterialIcon';
import { type MenuItem } from '../modules/navigation/menuItems';

type SidebarProps = {
  activeItemKey: string;
  isCollapsed: boolean;
  items: MenuItem[];
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
  onToggleCollapse: () => void;
};

export function Sidebar({ activeItemKey, isCollapsed, items, onClose, onSelectItem, onToggleCollapse }: SidebarProps) {
  return (
    <aside className="sidebar" id="sidebar" aria-label="Menú principal" data-collapsed={isCollapsed}>
      <div className="sidebar__brand">
        <div className="brand-logo" aria-hidden="true">
          <span className="brand-logo__dot" />
        </div>
        <div className="sidebar__brand-copy">
          <p className="brand-eyebrow">Organizador personal</p>
          <h1>LifeOS</h1>
        </div>
        <button
          className="sidebar__collapse-button"
          type="button"
          aria-label={isCollapsed ? 'Expandir menú lateral' : 'Colapsar menú lateral'}
          aria-pressed={isCollapsed}
          onClick={onToggleCollapse}
        >
          <MaterialIcon name={isCollapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'} />
        </button>
      </div>

      <nav className="sidebar__nav" aria-label="Pantallas de LifeOS">
        {items.map((item) => {
          const isActive = activeItemKey === item.key;

          return (
            <button
              className={`nav-item${isActive ? ' is-active' : ''}`}
              type="button"
              data-page={item.key}
              aria-current={isActive ? 'page' : undefined}
              title={item.label}
              key={item.key}
              onClick={() => {
                onSelectItem(item);
                onClose();
              }}
            >
              <MaterialIcon name={item.icon} />
              <span className="nav-item__label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <button className="nav-item nav-item--muted" type="button" title="Ayuda">
          <MaterialIcon name="help" />
          <span className="nav-item__label">Ayuda</span>
        </button>
      </div>
    </aside>
  );
}
