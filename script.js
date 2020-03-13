const menu = document.querySelector('.menu__inner');
menu.addEventListener('click', (event) => {
  event.preventDefault();
  const targetItem = event.target;
  if (targetItem.classList.contains('menu__link')) {
    menu.querySelectorAll('.menu__link').forEach(el => el.classList.remove('menu__link_active'));
    targetItem.classList.add('menu__link_active');

    const yOffset = document.querySelector('.header').clientHeight;
    const element = document.querySelector(targetItem.getAttribute('href'));
    const y = element.getBoundingClientRect().top + window.pageYOffset - yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
  }
});