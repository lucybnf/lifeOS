const appShell = document.querySelector('.app-shell');
const menuToggle = document.querySelector('.menu-toggle');
const backdrop = document.querySelector('[data-sidebar-close]');
const navItems = document.querySelectorAll('.nav-item');
const currentPageTitle = document.querySelector('#current-page-title');
const mainContent = document.querySelector('#main-content');

const closeSidebar = () => {
  appShell.dataset.sidebarOpen = 'false';
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú principal');
  backdrop.hidden = true;
};

const openSidebar = () => {
  appShell.dataset.sidebarOpen = 'true';
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Cerrar menú principal');
  backdrop.hidden = false;
};

const toggleSidebar = () => {
  const isOpen = appShell.dataset.sidebarOpen === 'true';
  isOpen ? closeSidebar() : openSidebar();
};

const setActivePage = (selectedItem) => {
  navItems.forEach((item) => {
    const isSelected = item === selectedItem;
    item.classList.toggle('is-active', isSelected);

    if (isSelected) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });

  const pageName = selectedItem.textContent.trim();
  const pageKey = selectedItem.dataset.page;

  currentPageTitle.textContent = pageName;
  mainContent.querySelector('.empty-state').dataset.activePage = pageKey;
  closeSidebar();
};

menuToggle.addEventListener('click', toggleSidebar);
backdrop.addEventListener('click', closeSidebar);

navItems.forEach((item) => {
  item.addEventListener('click', () => setActivePage(item));
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSidebar();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) {
    closeSidebar();
  }
});
