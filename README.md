#  Agenda
# LifeOS

LifeOS es una aplicación web personal para organizar áreas importantes de la vida desde una interfaz simple, moderna y responsive.

## Stack actual

- React
- Vite
- TypeScript
- CSS modular por estructura de carpetas, sin frameworks de UI

## Estructura inicial

```text
/
├── docs/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   ├── layouts/
│   ├── modules/
│   ├── pages/
│   ├── routes/
│   └── styles/
└── README.md
```

- `src/main.tsx`: punto de entrada de React.
- `src/App.tsx`: componente raíz de la aplicación.
- `src/layouts/`: layouts reutilizables de la app, incluyendo la estructura principal de LifeOS.
- `src/components/`: componentes reutilizables como Sidebar, Topbar, ProfileMenu e íconos.
- `src/modules/`: datos y lógica agrupados por dominio o módulo, incluyendo navegación.
- `src/pages/`: pantallas de la aplicación.
- `src/routes/`: composición inicial de rutas/pantallas.
- `src/styles/global.css`: estilos globales migrados desde la base HTML/CSS original.
- `docs/`: documentación del proyecto.

## Base visual actual

- Sidebar oscuro colapsable con navegación principal y acceso a Ayuda.
- Barra superior fija con buscador visual, botón Filtrar y menú Mi perfil.
- Área de contenido clara con pantalla de bienvenida preparada para futuras rutas.
