const MAX_DURATION = 5 * 60;
const minutesNode = document.querySelector('.game__minutes');
const secondsNode = document.querySelector('.game__seconds');

const start = Date.now();
let timer;

const convertToTwoDigits = number => number < 10 ? `0${number}` : number;

const draw = () => {
  const totalSecondsLeft = MAX_DURATION - Math.ceil((Date.now() - start) / 1000);
  const seconds = totalSecondsLeft % 60;
  const minutes = (totalSecondsLeft - seconds) / 60;

  minutesNode.innerText = convertToTwoDigits(minutes);
  secondsNode.innerText = convertToTwoDigits(seconds);

  if(totalSecondsLeft <= 0) {
    clearInterval(timer);
  }
}

export default () => {
  timer = setInterval(() => { requestAnimationFrame(draw) }, 1000);
};
