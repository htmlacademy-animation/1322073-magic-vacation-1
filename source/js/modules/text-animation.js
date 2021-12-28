const LETTER_CLASS_NAME = 'title-animation__letter';
const LINE_CLASS_NAME = 'title-animation__line';
const ORDER = [
  [3, 1, 0, 1, 2, 1, 0, 4, 2, 0, 2, 0],
  [3, 4, 2, 0, 3, 1]
];

const wrapLetters = text => {
  const letters = text.split('');
  const textNode = document.createElement('span');
 
  letters.forEach((letter, i) => {
    const letterNode = document.createElement('span');
    letterNode.textContent = letter;
    letterNode.classList.add(LETTER_CLASS_NAME);
    textNode.appendChild(letterNode);        
  });

  return textNode;
}

const wrapLines = textNode => {
  const text = textNode.innerHTML;
  const words = text.split(' ');
  let lineNode;
  
  textNode.innerHTML = '';
  
  words.forEach((word, i) => {
    lineNode = wrapLetters(word);;
    lineNode.classList.add(LINE_CLASS_NAME);    
    textNode.appendChild(lineNode);        
  });
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

  node.childNodes.forEach((letter, i) => {
    const orderLetter = orderLine[i % orderLine.length];
    const letterDelay = orderLetter * 0.1 + lineDelay;
    const delay = `${letterDelay}s`;
    animateLetter(letter, { ...settings, delay });
  });
}

const animateText = (node, settings) => {  
  wrapLines(node);

  const lineNodes = document.querySelectorAll(`.${LINE_CLASS_NAME}`);

  lineNodes.forEach((node, i) => {
    animateLine(node, settings, i);
  })
}

export default animateText;
