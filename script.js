// window.onload = function () {

/*  MENU  */
const menu = document.querySelector('.menu__inner');
const menuItems = menu.querySelectorAll('.menu__link');
const menuItemsArray = Array.from(menuItems);
const headerHeight = document.querySelector('.header').clientHeight;

const scrollItemsArray = menuItemsArray.map((item) =>
  document.querySelector(item.getAttribute("href"))
);
let lastId;
let currentMenuItem;

/*  SLIDER  */
const phones = document.querySelectorAll('.iphone');

const slider = document.querySelector('.slider');
const sliderInner = document.querySelector('.slider__inner');
const slides = document.querySelectorAll('.slide');
let currentSlideIndex = 0;
let isEnable = true;
const arrowPrev = document.querySelector('.slider__arrow.arrow-prev');
const arrowNext = document.querySelector('.slider__arrow.arrow-next');

/*  FORM  */
const form = document.querySelector('.form');
const subject = document.querySelector('#subject');
const text = document.querySelector('#text');

const message = document.querySelector('.message');
const closeBtn = document.querySelectorAll('.close');
const messageSubject = document.querySelector('.message__subject');
const messageDescription = document.querySelector('.message__description');

/*  PORTFOLIO  */
const tabs = document.querySelector('.tabs');
const tabsItems = document.querySelectorAll('.tabs__link');

const portfolio = document.querySelector('.portfolio__items');
const portfolioItems = document.querySelectorAll('.portfolio__item');
let portfolioItemsArray;


/*  BURGER MENU */

const burgerButton = document.querySelector('.menu__button');
const burgerButtonWrap = document.querySelector('.menu');

/*  SLIDER  */

//slider phones screens
phones.forEach(item => {
  item.addEventListener('click', function (event) {
    this.classList.toggle('iphone_active');
  });
});

function changeCurrentItem(n) {
  currentSlideIndex = (n + slides.length) % slides.length;
}

function hideSlide(direction) {
  isEnable = false;
  slides[currentSlideIndex].classList.add(direction);
  slides[currentSlideIndex].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  })
}
function showSlide(direction) {
  slides[currentSlideIndex].classList.add('next', direction);
  slides[currentSlideIndex].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnable = true;
  })
}

function changeSliderBackground() {
  slider.classList.toggle('slider_colored');
}

function previousSlide(n) {
  hideSlide('to-right');
  changeCurrentItem(n - 1);
  changeSliderBackground();
  showSlide('from-left');
}

function nextSlide(n) {
  hideSlide('to-left');
  changeCurrentItem(n + 1);
  changeSliderBackground();
  showSlide('from-right');
}


arrowPrev.addEventListener('click', function () {
  if (isEnable) {
    previousSlide(currentSlideIndex);
  }
});

arrowNext.addEventListener('click', function () {
  if (isEnable) {
    nextSlide(currentSlideIndex);
  }
});

//swipe
const swipedetect = (element) => {
  let surface = element;

  let startX = 0;
  let startY = 0;

  let dist = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let thresholdX = 100;
  let restraintY = 100;

  let allowedTime = 600;

  surface.addEventListener('mousedown', function (event) {
    dist = 0;
    startX = event.pageX;
    startY = event.pageY;
    startTime = new Date().getTime();
    // event.preventDefault();
  });

  surface.addEventListener('mouseup', function (event) {
    distX = event.pageX - startX;
    distY = event.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= thresholdX && Math.abs(distY) <= restraintY) {
        if (distX > 0) {
          if (isEnable) {
            previousSlide(currentSlideIndex);
          }
        } else {
          if (isEnable) {
            nextSlide(currentSlideIndex);
          }
        }
        event.preventDefault();
      }
    }




  });
}

swipedetect(sliderInner);

/*  MENU */

function activateMenuItem(currentItem) {
  menuItems.forEach(item => item.classList.remove('menu__link_active'));
  currentItem.classList.add('menu__link_active');
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
    if(window.innerWidth < 768) {
      burgerButtonWrap.classList.remove('menu_active');
    }
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

        menuItems.forEach(item => {
          item.getAttribute("href") === '#' + id ? currentMenuItem = item : ''
        });
        activateMenuItem(currentMenuItem);
      }
    }
  });
});

/*  FORM  */

function openMessage() {
  message.classList.remove('hidden');
  setTimeout(() => (message.style.opacity = 1), 400);
}

function closeMessage() {
  message.style.opacity = 0;
  setTimeout(() => message.classList.add('hidden'), 400);
}

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

/*  PORTFOLIO */

//portfolio tabs

function filterPortfolio(currentTab) {
  const currentIndex = currentTab.dataset.tab;

  if (currentTab.classList.contains('tabs__link_active')) {
    return;
  }

  tabsItems.forEach(item => item.classList.remove('tabs__link_active'));
  currentTab.classList.add('tabs__link_active');

  portfolioItemsArray = Array.from(portfolioItems);

  portfolioItemsArray.map((item, index, array) => {
    if (item.dataset.tabitem == currentIndex) {
      array.splice(index, 1);
      array.unshift(item);
    }
  });

  portfolio.innerHTML = '';
  portfolioItemsArray.forEach((item) => portfolio.append(item));
}

tabs.addEventListener('click', event => {
  event.preventDefault();
  filterPortfolio(event.target);

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


//burger menu
burgerButton.addEventListener('click', function(event) {
  burgerButtonWrap.classList.toggle('menu_active');
});

document.querySelector('body').addEventListener('click', function(event){
  let activeMenu = document.querySelector('.menu_active');
  if(window.innerWidth < 768 && activeMenu) {
    if(!event.target == activeMenu || !activeMenu.contains(event.target)){
      burgerButtonWrap.classList.remove('menu_active');
    }
  }
});

// }
