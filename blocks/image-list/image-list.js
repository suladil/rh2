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
  const blockLinkWrapper = blockLink.closest('div').parentElement;
//   console.log(blockLinkWrapper);

  const isLookbook = block.classList.contains('lookbook-teasers');

  const listData = await fetchJson(blockLink);
  listData.forEach(image => {
	var img = '';
	if(!isLookbook){
		img = createOptimizedPicture(image.image, image.title, false, [{ width: 5000 }]);
	} else {
		img = createOptimizedPicture(image.teaserImg, image.bookTitle, false, [{ width: 5000 }]);
	}
	// img.lastElementChild.width = '5000';
	// img.lastElementChild.height = '4500';

	const createdSection = document.createElement('div');

	if(isLookbook){
		if(image.featuredTeaser === 'true'){		
			createdSection.innerHTML = `
			<div class="image-list-item">
				<a href=${image.wrappingLink} target="_blank">
					<div>	
						${img.outerHTML}
					</div>
					<div class="teaser-content">
						<img src=${image.teaserHeading} />
						<div class="buttons-container">
							<a href=${image.teaserLink1}>Explore the sourcebook</a>
							<a href=${image.teaserLink2}>shop the collections</a>
						</div>
					</div>
				</a>
			</div>
		`;	
	  }
	} else {
	createdSection.innerHTML = `
	  <div class="image-list-item">
	 	<a href=${image.link} target="_blank">
	  		${img.outerHTML}
		</a>
	  </div>
	`;
	}

	block.append(createdSection);
  })
}