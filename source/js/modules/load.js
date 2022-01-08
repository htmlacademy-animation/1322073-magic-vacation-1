import animateText from './text-animation';

const TITLE_SELECTORS = [
  '.intro__title',
  '.slider__item-title',
  '.prizes__title',
  '.rules__title',
  '.game__title'
];

const DEFAULT_SETTINGS = {
  property: 'transform',
  duration: '1s',
  timingFunction: 'cubic-bezier(0, 0, 0.21, 0.99)'
}

const animateTitles = () => {
  TITLE_SELECTORS.forEach(titleSelector => {
    const titleNode = document.querySelector(titleSelector);
  
    animateText(titleNode, DEFAULT_SETTINGS);
  });
}

const animateDate = () => {
  const dateNode = document.querySelector('.intro__date');

  animateText(dateNode, { ...DEFAULT_SETTINGS, delay: 1 });
}

export default () => {
  const onLoad = () => {
    animateTitles();
    animateDate();
    document.body.classList.add('loaded');
    window.removeEventListener('load', onLoad);
  };

  window.addEventListener('load', onLoad);
};
