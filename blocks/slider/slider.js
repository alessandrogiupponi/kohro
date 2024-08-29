let sliderId = 0;
const slideClonedClass = 'cloned';
let allSlides;
let sliderItems;
let slider;
let currentPos = 2;
let slideWidth;
let sliderWidth;

function cloneSlides() {
  const fragmentBefore = document.createDocumentFragment();
  const fragmentAfter = document.createDocumentFragment();

  // eslint-disable-next-line no-plusplus
  for (let j = 2; j--;) {
    const num = j % sliderItems.length;
    const cloneFirst = sliderItems[num].cloneNode(true);
    cloneFirst.classList.add(slideClonedClass);
    fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);

    const cloneLast = sliderItems[sliderItems.length - 1 - num].cloneNode(true);
    cloneLast.classList.add(slideClonedClass);
    fragmentBefore.appendChild(cloneLast);
  }

  slider.insertBefore(fragmentBefore, slider.firstChild);
  slider.appendChild(fragmentAfter);
}

function reActivate() {
  document.querySelectorAll('.slider-item').forEach((e) => e.classList.remove('active'));
  allSlides[currentPos > 0 ? currentPos - 1 : 0].classList.add('active');
}

function getX() {
  return currentPos * slideWidth - slideWidth - (sliderWidth - slideWidth) / 2;
}

function renderSlider() {
  cloneSlides();
  allSlides = document.querySelectorAll('.slider-item');
  reActivate();
  const coordinates = getX();
  slider.style.transform = `translate(${-coordinates}px)`;
}

function goPrev() {
  currentPos = currentPos > 0 ? currentPos - 1 : allSlides.length - 1;
  console.log(currentPos);
  if (currentPos < 3) {
    setTimeout(() => {
      slider.style.transition = 'none';
      currentPos = allSlides.length - 2;
      reActivate();

      // eslint-disable-next-line no-use-before-define
      coordinates = getX();
      // eslint-disable-next-line no-use-before-define
      slider.style.transform = `translate(${-coordinates}px)`;
    }, 400);

    setTimeout(() => {
      slider.style.transition = 'all 0.4s ease-in';
    }, 420);
  }

  let coordinates = getX();
  reActivate();

  slider.style.transform = `translate(${-coordinates}px)`;
}

function goNext() {
  currentPos = (allSlides.length - 1) !== currentPos ? currentPos + 1 : 3;
  console.log(currentPos);

  if (currentPos === (allSlides.length - 1)) {
    setTimeout(() => {
      slider.style.transition = 'none';
      currentPos = 3;
      reActivate();
      // eslint-disable-next-line no-use-before-define
      coordinates = getX();
      // eslint-disable-next-line no-use-before-define
      slider.style.transform = `translate(${-coordinates}px)`;
    }, 400);

    setTimeout(() => {
      slider.style.transition = 'all 0.4s ease-in';
    }, 420);
  }

  let coordinates = getX();
  reActivate();
  slider.style.transform = `translate(${-coordinates}px)`;
}

export default async function decorate(block) {
  sliderId += 1;
  block.classList.add(`slider-${sliderId}`);
  const sliderBox = document.createElement('div');
  sliderBox.classList.add('slider-box');
  const rows = block.querySelectorAll(':scope > div');
  rows.forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('slider-item');
    slide.append(row.querySelector('div'));
    sliderBox.append(slide);
    row.remove();
  });
  block.append(sliderBox);
  const prev = document.createElement('button');
  prev.classList.add('prev');
  prev.innerHTML = '<';
  prev.addEventListener('click', () => {
    goPrev();
  });
  block.append(prev);
  const next = document.createElement('button');
  next.classList.add('next');
  next.innerHTML = '>';
  next.addEventListener('click', () => {
    goNext();
  });
  block.append(next);

  const options = {
    rootMargin: '0px',
    threshold: 1.0,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(() => {
      slideWidth = sliderItems[0].offsetWidth;
      sliderWidth = slider.offsetWidth;
      renderSlider();
    });
  }, options);

  slider = document.querySelector('.slider-box');
  sliderItems = document.querySelectorAll('.slider-item');
  observer.observe(slider);
}
