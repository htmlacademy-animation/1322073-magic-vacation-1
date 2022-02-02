const MAX_DURATION = 300;
const FPS = 12;

const prizes = {
  journeys: {
    amount: [1, 3],
    start: 2000
  },
  cases: {
    amount: [1, 7],
    start: 3000
  },
  codes: {
    amount: [11, 900],
    start: 4000
  }
};

const minutesNode = document.querySelector('.game__minutes');
const secondsNode = document.querySelector('.game__seconds');

const gameCounter = () => {
  const start = Date.now();
  const timer = setInterval(() => { requestAnimationFrame(drawTime) }, 1000);

  const convertToTwoDigits = number => number < 10 ? `0${number}` : number;

  const drawTime = () => {
    const totalSecondsLeft = Math.floor((Date.now() - start) / 1000);
    const seconds = totalSecondsLeft % 60;
    const minutes = (totalSecondsLeft - seconds) / 60;

    minutesNode.innerText = convertToTwoDigits(minutes);
    secondsNode.innerText = convertToTwoDigits(seconds);

    if(totalSecondsLeft >= MAX_DURATION) {
      clearInterval(timer);
    }
  }
};

const prizesCounter = ({ amount, node }) => {
  const numberNode = node.querySelector('.prizes__number');
  const descriptionNode = node.querySelector('.prizes__desc');
  const step = Math.max((amount[1] - amount[0]) / FPS, 1);
  const timer = setInterval(() => { requestAnimationFrame(drawNumber) }, 1000 / FPS);
  let counter = amount[0];
  let roundedCounter = counter;

  descriptionNode.classList.add('prizes__desc--active');

  const drawNumber = () => {
    numberNode.innerText = roundedCounter;
    counter = counter + step;
    roundedCounter = Math.floor(counter);

    if(roundedCounter > amount[1]) {
      clearInterval(timer);
    }
  }
}

const launchAllPrizesCounters = () => {
  Object.keys(prizes)
    .forEach(key => {
      prizes[key].node = document.querySelector(`.prizes__item--${key}`);
      prizes[key].image = prizes[key].node.querySelector('.prizes__icon');
      prizes[key].startAnimation = document.querySelector(`#${key}start`);
      // prizes[key].image.classList.remove('prizes__icon--hidden');
    });

  Object.values(prizes).forEach(prize => {
    setTimeout(() => {
      prizesCounter(prize);
      prize.startAnimation.beginElement();
      prize.image.classList.remove('prizes__icon--hidden');
    },
    prize.start);
  });
}

export {gameCounter, launchAllPrizesCounters};
