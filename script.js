// window.onload = function () {
const menu = document.querySelector('.menu__inner');
const menuItems = menu.querySelectorAll('.menu__link');
const menuItemsArray = Array.from(menuItems);
const headerHeight = document.querySelector('.header').clientHeight;

const scrollItemsArray = menuItemsArray.map((item) =>
  document.querySelector(item.getAttribute("href"))
);
let lastId;
let currentMenuItem;

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
function activateMenuItem(currentItem) {
  menuItems.forEach(item => item.classList.remove('menu__link_active'));
  currentItem.classList.add('menu__link_active');
}

function openMessage() {
  message.classList.remove('hidden');
  setTimeout(() => (message.style.opacity = 1), 400);
}

function closeMessage() {
  message.style.opacity = 0;
  setTimeout(() => message.classList.add('hidden'), 400);
}


//menu to scroll
menu.addEventListener('click', event => {
  const targetItem = event.target;
  if (targetItem.classList.contains('menu__link')) {
    event.preventDefault();

    activateMenuItem(targetItem);

    let href = targetItem.getAttribute('href');
    const offsetTop = href === '#' ? 0 :
      document.querySelector(href).getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }
});

// scroll to menu
window.addEventListener('scroll', function (event) {
  let fromTop = window.pageYOffset + headerHeight;
  scrollItemsArray.forEach((item) => {
    if (item.offsetTop <= fromTop && item.offsetTop + item.offsetHeight > fromTop) {
      let id = item.getAttribute('id');
      if (lastId !== id) {
        lastId = id;
        console.log('lastId', lastId);
        
        menuItems.forEach(item => {
          item.getAttribute("href") === '#' + id ? currentMenuItem=item : ''});
          activateMenuItem(currentMenuItem);
      }
    }
  });
});

//form popup
form.addEventListener('submit', event => {
  event.preventDefault();

  if (!subject.value) {
    messageSubject.textContent = 'Without subject';
  } else {
    messageSubject.textContent = 'Subject: ' + String(subject.value);
  }

  if (!text.value) {
    messageDescription.textContent = 'Without description';
  } else {
    messageDescription.textContent = 'Description: ' + String(text.value);
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

//portfolio items active
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
