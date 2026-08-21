export type MenuItem = {
  key: string;
  label: string;
  icon: string;
  path: string;
};

export const menuItems: MenuItem[] = [
  { key: "inicio", label: "Inicio", icon: "home", path: "/" },
  { key: "agenda", label: "Agenda", icon: "calendar_month", path: "/agenda" },
  { key: "facultad", label: "Facultad", icon: "school", path: "/facultad" },
  { key: "trabajo", label: "Trabajo", icon: "work", path: "/trabajo" },
  {
    key: "finanzas",
    label: "Finanzas",
    icon: "account_balance_wallet",
    path: "/finanzas",
  },
  { key: "hogar", label: "Hogar", icon: "cottage", path: "/hogar" },
  {
    key: "proyectos",
    label: "Proyectos",
    icon: "folder_open",
    path: "/proyectos",
  },
  { key: "notas", label: "Notas", icon: "edit_note", path: "/notas" },
];
