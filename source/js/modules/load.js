export default () => {
  const onLoad = () => {
    document.body.classList.add('loaded');
    window.removeEventListener('load', onLoad);
  };

  window.addEventListener('load', onLoad);
};
