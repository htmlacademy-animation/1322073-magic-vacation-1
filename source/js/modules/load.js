import animateText from './text-animation';

const TITLE_SELECTORS = [
  '.intro__title',
  '.slider__item-title',
  '.prizes__title',
  '.rules__title',
  '.game__title'
];

const animateTitles = () => {
  TITLE_SELECTORS.forEach(titleSelector => {
    const titleNode = document.querySelector(titleSelector);
    titleNode.classList.add('title-animation');
  
    animateText(titleNode, {
      property: 'transform',
      duration: '1s',
      timingFunction: 'cubic-bezier(0, 0, 0.21, 0.99)'
    });
  });
}

export default () => {
  const onLoad = () => {
    animateTitles();
    document.body.classList.add('loaded');
    window.removeEventListener('load', onLoad);
  };

  window.addEventListener('load', onLoad);
};
