import { addListeners, isInfoPage } from './common/utils';
import D from './common/doms';

import {
  isCorrectCvv,
} from './messages/cvv';

let isCorrectDate;
let isCorrectCardNumber;

if (!isInfoPage) {
  ({ isCorrectDate } = require('./messages/date'));
  ({ isCorrectCardNumber } = require('./messages/cardNumber'));
}


const validateCard = (e) => {
  let isOk = true;

  [
    isCorrectCvv,
    isCorrectDate,
    isCorrectCardNumber,
  ].forEach((callback) => {
    const isCorrect = callback ? callback() : true;

    if (isOk && !isCorrect) {
      isOk = false;
    }
  });

  if (!isOk) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

const handleKeyDown = callback => (e) => {
  const key = e.key || e.keyCode;

  if (
    key === 'Tab'
    || key === 'tab'
    || key === 9
  ) {
    callback();
  }
};


addListeners([
  {
    dom: D.cardNumber,
    event: 'keydown',
    callback: handleKeyDown(isCorrectCardNumber),
  },
  {
    dom: D.date,
    event: 'keydown',
    callback: handleKeyDown(isCorrectDate),
  },
  {
    dom: D.cvvBtnDone,
    event: 'keydown',
    callback: handleKeyDown(isCorrectCvv),
  },
  {
    dom: D.cvv,
    event: 'keydown',
    callback: handleKeyDown(isCorrectCvv),
  },
  {
    dom: D.form,
    event: 'submit',
    callback: validateCard,
  },
]);
