const TEXT_CLASS_NAME = 'title-animation';
const LETTER_CLASS_NAME = 'title-animation__letter';
const TEMP_CLASS_NAME = 'title-animation__temp';
const LINE_CLASS_NAME = 'title-animation__line';
const ORDER = [
  [3, 1, 0, 1, 2, 1, 0, 4, 2, 0, 2, 0],
  [3, 4, 2, 0, 3, 1]
];

const wrapLetters = textNode => {
  const text = textNode.innerHTML;
  const letters = text.split('');
 
  return letters.map(letter => {
    const letterNode = document.createElement('span');
    letterNode.textContent = letter;
    letterNode.classList.add(LETTER_CLASS_NAME);
    return letterNode;
  });
}

const wrapLines = textNode => {
  const letterNodes = wrapLetters(textNode);
  const lineNodes = [];
  let lineNode;

  textNode.innerHTML = '';
  
  letterNodes.forEach(node => {
    textNode.appendChild(node);
  });
  
  textNode.classList.add(TEMP_CLASS_NAME);
  
  letterNodes.forEach((node, i) => {
    if(i === 0 || node.offsetTop !== letterNodes[i - 1].offsetTop) {
      lineNode = document.createElement('span');
      lineNode.classList.add(LINE_CLASS_NAME);
      lineNodes.push(lineNode);
    }
    
    lineNode.appendChild(node.cloneNode(true));
  });
  
  textNode.innerHTML = '';

  lineNodes.forEach(node => {
    textNode.appendChild(node);
  })

  textNode.classList.remove(TEMP_CLASS_NAME);

  return lineNodes;
}

const animateLetter = (node, settings = {}) => {
  const { property, duration, timingFunction, delay } = settings;

  node.style.transitionProperty = property;
  node.style.transitionDuration = duration;
  node.style.transitionTimingFunction = timingFunction;
  node.style.transitionDelay = delay;
}

const animateLine = (node, settings = {}, lineNumber = 0) => {
  const orderLine = ORDER[lineNumber % ORDER.length];
  const lineDelay = lineNumber * 0.5;
  const originalDelay = settings.delay || 0;

  node.childNodes.forEach((letter, i) => {
    const orderLetter = orderLine[i % orderLine.length];
    const letterDelay = orderLetter * 0.1 + lineDelay;
    const delay = `${originalDelay + letterDelay}s`;
    animateLetter(letter, { ...settings, delay });
  });
}

const animateText = (node, settings) => {
  node.classList.add(TEXT_CLASS_NAME);

  const lineNodes = wrapLines(node);

  lineNodes.forEach((node, i) => {
    animateLine(node, settings, i);
  })
}

export default animateText;
