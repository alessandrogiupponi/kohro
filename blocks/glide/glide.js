import { fetchPlaceholders } from '../../scripts/aem.js';

let glideId = 0;
export default async function decorate(block) {
  glideId += 1;
  block.setAttribute('id', `glide-${glideId}`);
  const track = document.createElement('div');
  track.classList.add('glide__track');
  track.dataset.glideEl = 'track';

  const slides = document.createElement('ul');
  slides.classList.add('glide__slides');
  
  const rows = block.querySelectorAll(':scope > div');
  
  rows.forEach((row, idx) => {
    const slide = document.createElement('li');
    slide.style.width = '50%';
    slide.classList.add('glide__slide');
    slide.append(row.querySelector('div'));
    slides.append(slide);
    row.remove();
  });

  track.append(slides);
  block.append(track);
  
  const arrows = document.createElement('div');
  arrows.classList.add('glide__arrows');
  arrows.dataset.glideEl = 'controls';
  
  const prev = document.createElement('button');
  prev.classList.add('glide__arrow');
  prev.classList.add('glide__arrow--left');
  prev.dataset.glideDir = '<';
  prev.innerHTML = '<';
  arrows.append(prev);
  
  const next = document.createElement('button');
  next.classList.add('glide__arrow');
  next.classList.add('glide__arrow--right');
  next.dataset.glideDir = '>';
  next.innerHTML = '>';
  arrows.append(next);
  block.append(arrows);

  
}
