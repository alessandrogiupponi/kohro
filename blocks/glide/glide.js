import { fetchPlaceholders } from '../../scripts/aem.js';

let glideId = 0;
export default async function decorate(block) {
  glideId += 1;
  block.setAttribute('id', `carousel-${glideId}`);
  const track = document.createElement('div');
  track.classList.add('glide__track');
  track.dataset.glideEl = 'track';

  const slides = document.createElement('ul');
  slides.classList.add('glide__slides');
  
  const rows = block.querySelectorAll(':scope > div');
  
  rows.forEach((row, idx) => {
    const slide = document.createElement('li');
    slide.classList.add('glide__slide');
    slide.append(row.querySelector('div'));
    slides.append(slide);
    row.remove();
  });

  track.append(slides);
  block.append(track);

  <div class="glide__arrows" data-glide-el="controls">
    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
  </div>

  const arrows = document.createElement('div');
  arrows.classList.add('glide__arrows');
  arrows.dataset.glideEl = 'controls';
  
  const prev = document.createElement('button');
  prev.classList.add('glide__arrow');
  prev.classList.add('glide__arrow--left');
  prev.dataset.glideDir = '<';
  arrows.append(prev);
  
  const next = document.createElement('button');
  next.classList.add('glide__arrow');
  next.classList.add('glide__arrow--right');
  next.dataset.glideDir = '>';
  arrows.append(next);
  block.append(arrows);
  
}
