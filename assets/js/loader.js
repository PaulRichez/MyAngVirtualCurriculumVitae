const loader = document.getElementById('loader');

window.addEventListener('load', () => {
    loader.classList.add('fondu-out');
    setTimeout(() => loader.remove(), 2000)
})