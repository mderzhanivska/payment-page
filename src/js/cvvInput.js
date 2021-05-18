import D from './common/doms';
import { addListeners, shuffle } from './common/utils';
import { isCorrectCvv } from './messages/cvv';

const getDom = selector => D.cvvKeyboard.querySelector(selector);

const DCvv = {
  keys: getDom('.keys'),
  done: getDom('.done'),
  clear: getDom('.clear'),
  close: getDom('.close'),
  change: getDom('.change'),
};


// randomly changes the position of buttons on keyboard
function getRandomKeyBoard() {
  const numbers = shuffle(
    Array.from({ length: 10 }, (_, i) => i)
      .map(number => `<div class="keys-item"><span data-number="${number}">${number}</span></div>`),
  );

  DCvv.keys.innerHTML = numbers.join('');
}


function handleClickKeyboard({ target }) {
  const { number } = target.dataset;

  // value (cvv) not bigger than 3 digits
  if (!number || D.cvv.value.length > 2) {
    return;
  }

  D.cvv.value += number;
}


function handleClickClearCvv() {
  D.cvv.value = '';
}


const toogleKeyboard = (isAdd = true) => () => {
  D.cvvKeyboard.classList[isAdd ? 'add' : 'remove']('show');

  if (!isAdd) {
    isCorrectCvv();
  }
};


addListeners([
  {
    dom: D.cvvKeyboard,
    event: 'click',
    callback: handleClickKeyboard,
  },
  {
    dom: D.cvv,
    event: 'click',
    callback: toogleKeyboard(),
  },
  {
    dom: DCvv.clear,
    event: 'click',
    callback: handleClickClearCvv,
  },
  {
    dom: DCvv.close,
    event: 'click',
    callback: toogleKeyboard(false),
  },
  {
    dom: DCvv.done,
    event: 'click',
    callback: toogleKeyboard(false),
  },
  {
    dom: DCvv.change,
    event: 'click',
    callback: getRandomKeyBoard,
  },
]);

getRandomKeyBoard();
