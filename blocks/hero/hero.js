import { makeVideo } from '../../scripts/scripts.js';
import { decorateIcons } from '../../scripts/aem.js';

export default async function decorate(block) {
  decorateIcons(block);
  const wrappingLink = block.querySelector('strong > a');
  const videoBlockWrapper = block.querySelector('div.button-container');
  const linkVideoWrapper = document.createElement('div');
  linkVideoWrapper.classList.add('video-wrapper')
  wrappingLink.append(linkVideoWrapper);
  videoBlockWrapper.append(wrappingLink);

  console.log(videoBlockWrapper)

  if (Object.values(block.classList).includes('video')) {
    const videoSrc = block.querySelector('div > a');

    if(videoSrc.href.includes(window.hlx.codeBasePath)) {
      videoSrc.href = videoSrc.text;
    }

    makeVideo(linkVideoWrapper, videoSrc.href);
    videoSrc.remove();
  }
}