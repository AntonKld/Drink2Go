const navOpen = document.querySelector('.main-nav__toggle');
const siteList = document.querySelector('.site-list');

siteList.classList.remove('site-list--nojs');

navOpen.addEventListener('click', () => {
  if (!navOpen.classList.contains('main-nav__toggle--closed')) {
    siteList.style.display = 'block';
    navOpen.classList.remove('main-nav__toggle');
    navOpen.classList.add('main-nav__toggle--closed');
  } else {
    siteList.style.display = 'none';
    navOpen.classList.remove('main-nav__toggle--closed');
    navOpen.classList.add('main-nav__toggle');
  }
});

/* Slider */

const swiper = new Swiper('.swiper', {
  loop: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


/* Range */

const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [0, 900],
    connect: true,
    step: 1,
    range: {
        'min': [0],
        'max': [950]
    }
});

const input0 = document.getElementById('input-0');
const input1 = document.getElementById('input-1');
const inputs = [input0, input1];

rangeSlider .noUiSlider.on ('update', function(values, handle) {
inputs[handle].value = Math.round(values[handle]);
});

const setRangeSlider = (i, value) => {
  let arr = [null, null];
  arr[i] = value;

  console.log(arr);

  rangeSlider.noUiSlider.set(arr);
};

inputs.forEach((el, index) => {
  el.addEventListener('change', (e) => {
    console.log(index);
    setRangeSlider(index, e.currentTarget.value);
  });
});
}

/* pagination */

const paginationBox = document.querySelector(".pagination");
const paginationPage = document.querySelectorAll(".pagination__page");
const paginationNext = document.querySelector(".next");
const paginationPrev = document.querySelector(".back");
const paginationMobileNext = document.querySelector(".arrow-mobile--next");
const paginationMobilePrev = document.querySelector(".arrow-mobile--back");

const MIN_PAGE = 1;
const MAX_PAGE = paginationPage.length;

let actualPage = 2;
paginationBox.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (
    evt.target.classList.contains("next") ||
    evt.target.classList.contains("arrow-mobile--next") ||
    evt.target.classList.contains("arrow-mobile__next")
  ) {
    actualPage++;
    if (actualPage === MAX_PAGE) {
      paginationNext.style.visibility = "hidden";
      paginationMobileNext.style.visibility = "hidden";
    }
    if (actualPage > MIN_PAGE) {
      paginationPrev.style.visibility = "visible";
      paginationMobilePrev.style.visibility = "visible";
    }

    for (let i = 0; i < paginationPage.length; i++) {
      if (paginationPage[i].classList.contains("pagination__item--active")) {
        paginationPage[i].classList.remove("pagination__item--active");
        paginationPage[i + 1].classList.add("pagination__item--active");
        return;
      }
    }
  } else if (
    evt.target.classList.contains("back") ||
    evt.target.classList.contains("arrow-mobile--back") ||
    evt.target.classList.contains("arrow-mobile__back")
  ) {
    actualPage--;
    if (actualPage < MAX_PAGE) {
      paginationNext.style.visibility = "visible";
      paginationMobileNext.style.visibility = "visible";
    }
    if (actualPage === MIN_PAGE) {
      paginationPrev.style.visibility = "hidden";
      paginationMobilePrev.style.visibility = "hidden";
    }

    for (let i = 0; i < paginationPage.length; i++) {
      if (paginationPage[i].classList.contains("pagination__item--active")) {
        paginationPage[i].classList.remove("pagination__item--active");
        paginationPage[i - 1].classList.add("pagination__item--active");
        return;
      }
    }
  }
});


/* Leaflet */

const map = L.map('map-leaflet')
  .setView({
    lat: 59.968322,
    lng: 30.317359
  }, 17);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/map/maps-icon.png',
  iconSize: [38, 50],
  iconAnchor: [19, 50],
});

const marker = L.marker(
  {
    lat: 59.968322,
    lng: 30.317359
  },
  {
    icon: mainPinIcon,
  },
);

marker.addTo(map);
