const appShell = document.querySelector('.app-shell');
const menuToggle = document.querySelector('.menu-toggle');
const backdrop = document.querySelector('[data-sidebar-close]');
const navItems = document.querySelectorAll('.nav-item');
const currentPageTitle = document.querySelector('#current-page-title');
const mainContent = document.querySelector('#main-content');
const searchForm = document.querySelector('.topbar__search');
const menuSearch = document.querySelector('#menu-search');
const filterToggle = document.querySelector('[data-filter-toggle]');
const profileButton = document.querySelector('.profile-button');
const profileDropdown = document.querySelector('#profile-dropdown');

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

const closeProfileMenu = () => {
  profileButton.setAttribute('aria-expanded', 'false');
  profileDropdown.hidden = true;
};

const toggleProfileMenu = () => {
  const isOpen = profileButton.getAttribute('aria-expanded') === 'true';
  profileButton.setAttribute('aria-expanded', String(!isOpen));
  profileDropdown.hidden = isOpen;
};

const normalizeText = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const filterMenuItems = () => {
  const query = normalizeText(menuSearch.value.trim());
  const onlyActive = filterToggle.getAttribute('aria-pressed') === 'true';

  navItems.forEach((item) => {
    const label = normalizeText(item.textContent.trim());
    const matchesSearch = label.includes(query);
    const matchesFilter = !onlyActive || item.classList.contains('is-active');
    item.hidden = !(matchesSearch && matchesFilter);
  });
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
  filterMenuItems();
};

menuToggle.addEventListener('click', toggleSidebar);
backdrop.addEventListener('click', closeSidebar);
profileButton.addEventListener('click', toggleProfileMenu);
searchForm.addEventListener('submit', (event) => event.preventDefault());
menuSearch.addEventListener('input', filterMenuItems);
filterToggle.addEventListener('click', () => {
  const isPressed = filterToggle.getAttribute('aria-pressed') === 'true';
  filterToggle.setAttribute('aria-pressed', String(!isPressed));
  filterMenuItems();
});

navItems.forEach((item) => {
  item.addEventListener('click', () => setActivePage(item));
});

window.addEventListener('click', (event) => {
  if (!event.target.closest('.profile-menu')) {
    closeProfileMenu();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSidebar();
    closeProfileMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) {
    closeSidebar();
  }
});
