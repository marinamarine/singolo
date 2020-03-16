// window.onload = function () {
const menu = document.querySelector('.menu__inner');

const form = document.querySelector('.form');
const subject = document.querySelector('#subject');
const text = document.querySelector('#text');

const message = document.querySelector('.message');
const closeBtn = document.querySelectorAll('.close');
const messageSubject = document.querySelector('.message__subject');
const messageDescription = document.querySelector('.message__description');

const tabs = document.querySelector('.tabs');
const tabsItems = document.querySelectorAll('.tabs__link');

const portfolio = document.querySelector('.portfolio__items');
const portfolioItems = document.querySelectorAll('.portfolio__item');

//functions
function openMessage() {
  message.classList.remove('hidden');
  setTimeout(() => (message.style.opacity = 1), 400);
}

function closeMessage() {
  message.style.opacity = 0;
  setTimeout(() => message.classList.add('hidden'), 400);
}

//menu
menu.addEventListener('click', event => {
  event.preventDefault();
  const targetItem = event.target;
  if (targetItem.classList.contains('menu__link')) {
    menu
      .querySelectorAll('.menu__link')
      .forEach(el => el.classList.remove('menu__link_active'));
    targetItem.classList.add('menu__link_active');

    const yOffset = document.querySelector('.header').clientHeight;
    const element = document.querySelector(targetItem.getAttribute('href'));
    const y =
      element.getBoundingClientRect().top + window.pageYOffset - yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
});

//form popup
form.addEventListener('submit', event => {
  event.preventDefault();

  if (!subject.value) {
    messageSubject.innerHTML = 'Without subject';
  } else {
    messageSubject.innerHTML = 'Subject: ' + String(subject.value);
  }

  if (!text.value) {
    messageDescription.innerHTML = 'Without description';
  } else {
    messageDescription.innerHTML = 'Description: ' + String(text.value);
  }

  form.reset();

  openMessage();
});

closeBtn.forEach(item => item.addEventListener('click', closeMessage));

//portfolio tabs
tabs.addEventListener('click', event => {
  event.preventDefault();
  const targetTab = event.target;
  const targetTabIndex = targetTab.dataset.tab;

  if (targetTab.classList.contains('tabs__link_active')) {
    console.log(targetTab);
    return;
  }

  tabsItems.forEach(item => item.classList.remove('tabs__link_active'));
  targetTab.classList.add('tabs__link_active');

  portfolioItems.forEach(item => {
    console.log(item.dataset.tabitem);
    item.classList.remove('portfolio__item_sorted');
    if (item.dataset.tabitem == targetTabIndex) {
      item.classList.add('portfolio__item_sorted');
    }
  });
});

//porfolio items active
portfolio.addEventListener('click', event => {
  event.preventDefault();

  const targetItem = event.target.closest('.portfolio__item');
  const activeItem = document.querySelector('.portfolio__item_active');

  if (targetItem.classList.contains('portfolio__item_active')) {
    targetItem.classList.remove('portfolio__item_active');
  } else {
    activeItem ? activeItem.classList.remove('portfolio__item_active') : '';
    targetItem.classList.add('portfolio__item_active');
  }
});

// }
