const sidebar = document.querySelector(".sidebar");
const sidebarToggleBtn = document.querySelectorAll(".sidebar-toggle");
const tooltipItems = document.querySelectorAll('.menu-item');
const menuLink = document.querySelectorAll('.menu-link');
const themeToggleBtn = document.querySelector(".theme-toggle");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");
const searchForm = document.querySelector(".search-form");

// Updates the theme icon based on current theme and sidebar state
const updateThemeIcon = () => {
  const isDark = document.body.classList.contains("dark-theme");
  themeIcon.textContent = sidebar.classList.contains("collapsed") ? (isDark ? "dark_mode" : "light_mode") : "dark_mode";
};

// Apply dark theme if saved or system prefers
const savedTheme = localStorage.getItem("theme");
const systemPreferDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
const shouldUseDarkTheme = savedTheme === "dark" || (!savedTheme && systemPreferDark);

document.body.classList.toggle("dark-theme", shouldUseDarkTheme);
updateThemeIcon();

// Toggle sidebar collapsed state on buttons click
sidebarToggleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isNowCollapsed = sidebar.classList.toggle("collapsed");
    updateThemeIcon();

    // Hanya untuk layar mobile
    if (window.innerWidth <= 768) {
      if (!isNowCollapsed) {
        document.body.classList.add("sidebar-open");
      } else {
        document.body.classList.remove("sidebar-open");
      }
    }
  });
});

// Expand the sidebar when the search form is clicked
searchForm.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    searchForm.querySelector("input").focus(); // Focus the input
  }
});

// Activate only one menu-link when clicked
menuLink.forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.menu-link.active').forEach(activeLink => {
      activeLink.classList.remove('active');
    });

    this.classList.add('active');
  });
});

// Toggle between themes on theme button click
themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
});

tooltipItems.forEach(item => {
  const label = item.querySelector('.menu-label');
  const tooltip = item.querySelector('.menu-tooltip');

  tooltip.textContent = label.textContent;

  item.addEventListener('mouseenter', () => {
    if (!sidebar.classList.contains('collapsed')) return;

    const rect = item.getBoundingClientRect();
    tooltip.style.top = `${rect.top + rect.height / 2}px`;
    tooltip.style.left = `${rect.right + 25}px`;
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(-50%)';
    tooltip.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
  });

  item.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(50%)';
  });
});

if (window.innerWidth > 768) {sidebar.classList.add("collapsed")};