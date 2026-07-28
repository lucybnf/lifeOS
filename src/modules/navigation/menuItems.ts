export type MenuItem = {
  key: string;
  label: string;
  icon: string;
};

export const menuItems: MenuItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'agenda', label: 'Agenda', icon: 'calendar_month' },
  { key: 'facultad', label: 'Facultad', icon: 'school' },
  { key: 'trabajo', label: 'Trabajo', icon: 'work' },
  { key: 'finanzas', label: 'Finanzas', icon: 'account_balance_wallet' },
  { key: 'hogar', label: 'Hogar', icon: 'home' },
  { key: 'proyectos', label: 'Proyectos', icon: 'folder_open' },
  { key: 'notas', label: 'Notas', icon: 'edit_note' },
  { key: 'configuracion', label: 'Configuración', icon: 'settings' },
];
