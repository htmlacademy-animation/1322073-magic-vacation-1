import animateText from './text-animation';

export default () => {
  const introTitle = document.querySelector('.intro__title');
  introTitle.classList.add('title-animation');

  animateText(introTitle, {
    property: 'transform',
    duration: '1s',
    timingFunction: 'cubic-bezier(0, 0, 0.21, 0.99)'
  });

  const onLoad = () => {
    document.body.classList.add('loaded');
    window.removeEventListener('load', onLoad);
  };

  window.addEventListener('load', onLoad);
};
