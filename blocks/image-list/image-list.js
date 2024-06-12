import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {

  async function fetchJson(link) {
    const response = await fetch(link?.href);

    if (response.ok) {
      const jsonData = await response.json();
      const data = jsonData?.data;
      return data;
    }
    return 'an error occurred';
  }

  const blockLink = block.querySelector('a');
  const listData = await fetchJson(blockLink);
  listData.forEach((image, idx) => {
	const img = createOptimizedPicture(image.image, image.title, false, [{ width: 2500 }]);
	img.lastElementChild.width = '1200';
	img.lastElementChild.height = '1000';
	
	const createdSection = document.createElement('div');
	createdSection.innerHTML = `
	  <div class="image-list-item">
	 	<a href=${image.link} target="_blank">
	  		${img.outerHTML}
		</a>
	  </div>
	`;

	block.append(createdSection);
  })
}