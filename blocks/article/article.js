import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const categoryMetadata = getMetadata('category');
  // const categoryH3 = `<h3 class="k-icon">
  //   ${categoryMetadata.split(';').forEach((category) => `<span>${category}</span>`)}</h3>`;
  const categoryH3 = document.createElement('h3');
  categoryH3.classList = 'k-icon';
  categoryH3.innerHTML = `${categoryMetadata.split(';').map((category) => `<span>${category}</span>`).join('')}`;
  // categoryMetadata.split(';').forEach((category) => {
  //   const span = document.createElement('span');
  //   span.innerText = category;
  //   categoryH3.append(span);
  // });
  block.prepend(categoryH3);
}
