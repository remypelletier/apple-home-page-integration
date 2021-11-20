const handleGlobalHeaderNav = () => {
    const globalHeader = document.getElementById('globalHeader');
    const navbarBurgerIcon = document.getElementById('navbarBurgerIcon');
    const navbarSearchInput = document.getElementById('navbarSearchInput');
    const navbarFormCancel = document.getElementById('navbarFormCancel');
    const navbarLoopLink = document.getElementById('navbarLoopLink');
    const utilsFilter = document.getElementById('utilsFilter');

    const closeForm = () => {
        // add initial values for animation on large screen
        if (globalHeader.classList.contains('large-screen__form-open')) {
            globalHeader.classList.add('large-screen__initial-state');
        }
        // close form
        globalHeader.classList.remove('small-screen__form-open');
        globalHeader.classList.remove('large-screen__form-open');
        navbarSearchInput.value = '';
    };
    navbarFormCancel.addEventListener('click', closeForm);
    utilsFilter.addEventListener('click', closeForm);

    // open / close menu on small screen
    navbarBurgerIcon.addEventListener('click', () => {
        globalHeader.classList.toggle('small-screen__menu-open');
    });

    // open form on small screen
    navbarSearchInput.addEventListener('focus', () => {
        // prevent from navbarLoopLink click event auto focus
        if (!globalHeader.classList.contains('large-screen__form-open')) {
            globalHeader.classList.add('small-screen__form-open');
        }
    });

    // open form on large screen
    navbarLoopLink.addEventListener('click', () => {
        globalHeader.classList.add('large-screen__form-open');
        navbarSearchInput.focus();
    });

    // remove classes between large and small screen behaviours
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
        if (e.matches) {
            // from small to large screen
            globalHeader.classList.remove('small-screen__form-open');
            globalHeader.classList.remove('small-screen__menu-open');
        } else {
            // from large to small screen
            globalHeader.classList.remove('large-screen__form-open');
            globalHeader.classList.remove('large-screen__initial-state');
        }
    });
};

const handleGlobalFooterNav = () => {
    const globalFooter = document.getElementById('globalFooter');
    const globalFooterNav = globalFooter.querySelector('.footer__nav');
    const globalFooterNavSections = globalFooterNav.querySelectorAll('.footer__nav-section');

    globalFooterNavSections.forEach(section => {
        section.querySelector('.footer__nav-section__title').addEventListener('click', () => {
            if (globalFooterNav.classList.contains('footer__nav-collapsible')) {
                section.classList.toggle('active');
            }
        });
    });

    // remove classes between large and small screen behaviours
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
        if (e.matches) {
            // from small to large screen
            globalFooterNav.classList.remove('footer__nav-collapsible');
        } else {
            // from large to small screen
            globalFooterNav.classList.add('footer__nav-collapsible');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    handleGlobalHeaderNav();
    handleGlobalFooterNav();
});
