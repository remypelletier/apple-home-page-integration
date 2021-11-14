document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded');

    document.getElementById('navbarMenuIcon').addEventListener('click', (e) => {
        e.currentTarget.parentNode.parentNode.classList.toggle('menu-open');
    });
});
