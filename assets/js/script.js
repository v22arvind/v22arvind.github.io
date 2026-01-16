document.addEventListener('DOMContentLoaded', () => {
    // === Sidebar Logic ===
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const mainContent = document.querySelector('.main-content');

    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebar-collapsed', isCollapsed);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }

    // Load sidebar preference
    const savedSidebarState = localStorage.getItem('sidebar-collapsed');
    if (savedSidebarState === 'true') {
        sidebar.classList.add('collapsed');
    }

    // === Theme Switcher Logic ===
    const themeBtns = document.querySelectorAll('.theme-btn');
    const body = document.body;

    const themes = ['default', 'theme-sky', 'theme-lavender', 'theme-mint'];

    function setTheme(themeClass, persist = true) {
        // Remove all theme classes first
        body.classList.remove('theme-sky', 'theme-lavender', 'theme-mint');

        // Add new theme class if it's not default
        if (themeClass !== 'default') {
            body.classList.add(themeClass);
        }

        // Update active button state
        themeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeClass);
        });

        // Save preference if requested
        if (persist) {
            localStorage.setItem('site-theme', themeClass);
        }
    }

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            setTheme(theme);
        });
    });

    // Load theme preference or select random for new users
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme) {
        setTheme(savedTheme, false); // No need to re-save what we just read
    } else {
        // Random theme for new users
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        setTheme(randomTheme, false); // Don't persist random selection so it's a surprise each time until set? 
        // Wait, if we don't persist it, the user sees a random theme. 
        // If they like it and don't touch anything, next time they come back, it changes.
        // That might be annoying.
        // However, the prompt asked: "save it for the browser or something so user doesn't has to change it everytime. Also is there was not a selection made/saved previously, select a random theme rather than a particular default."
        // Interpreting "save it ... so user doesn't has to change it everytime" applies to "once the user selects".
        // Interpreting "random theme rather than a particular default" applies to the initial state.
        // I will stick to NOT saving the random one, as per my plan.
    }

    // === Hero Parallax Effect ===
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            // Gentle parallax movement
            heroBg.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.05)`;
            // Scale slightly to prevent edges showing
        });
    }
});
