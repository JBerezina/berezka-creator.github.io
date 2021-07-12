let toggleButton = document.querySelector('.toggle-button');
let mobileNav = document.querySelector('.mobile-nav');
let mainNav = document.querySelector('.main-nav');
let backdrop = document.querySelector('.backdrop');

toggleButton.addEventListener('click', function () {
    mobileNav.style.display ='block';
    backdrop.style.display = 'block';
})

backdrop.addEventListener('click', function () {
    mobileNav.style.display = 'none';
    backdrop.style.display = 'none';
})