document.addEventListener('DOMContentLoaded', () => {
    const globalNav = document.getElementById('globalNav');
    const navbarBurgerIcon = document.getElementById('navbarBurgerIcon');
    const navbarSearchInput = document.getElementById('navbarSearchInput');
    const navbarFormCancel = document.getElementById('navbarFormCancel');
    const navbarLoopLink = document.getElementById('navbarLoopLink');
    const utilsFilter = document.getElementById('utilsFilter');

    const closeForm = () => {
        // add initial values for animation on large screen
        if (globalNav.classList.contains('large-screen__form-open')) {
            globalNav.classList.add('large-screen__initial-state');
        }
        // close form
        globalNav.classList.remove('small-screen__form-open');
        globalNav.classList.remove('large-screen__form-open');
        navbarSearchInput.value = '';
    };
    navbarFormCancel.addEventListener('click', closeForm);
    utilsFilter.addEventListener('click', closeForm);

    // open / close menu on small screen
    navbarBurgerIcon.addEventListener('click', () => {
        globalNav.classList.toggle('small-screen__menu-open');
    });

    // open form on small screen
    navbarSearchInput.addEventListener('focus', () => {
        // prevent from navbarLoopLink click event auto focus
        if (!globalNav.classList.contains('large-screen__form-open')) {
            globalNav.classList.add('small-screen__form-open');
        }
    });

    // open form on large screen
    navbarLoopLink.addEventListener('click', () => {
        globalNav.classList.add('large-screen__form-open');
        navbarSearchInput.focus();
    });

    // remove classes between large and small screen behaviours
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
        if (e.matches) {
            // from small to large screen
            globalNav.classList.remove('small-screen__form-open');
            globalNav.classList.remove('small-screen__menu-open');
        } else {
            // from large to small screen
            globalNav.classList.remove('large-screen__form-open');
            globalNav.classList.remove('large-screen__initial-state');
        }
    });
});
