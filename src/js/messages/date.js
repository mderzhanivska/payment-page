import { addListeners, langPage } from '../common/utils';
import { dict } from '../../config';

import D from '../common/doms';
import { onClickCloseMessage } from './common';


const $close = D.dateMessage.querySelector('.close');
const $description = D.dateMessage.querySelector('.description');

const today = new Date();
const someday = new Date();


export const isCorrectDate = () => {
  const expMonth = D.expMonth.value;
  const expYear = D.expYear.value;

  D.dateMessage.classList.add('show');

  if (expMonth && expYear) {
    someday.setFullYear(expYear, expMonth, 1);

    if (someday < today) {
      $description.innerHTML = dict.dateExp[langPage];
      return false;
    }

    D.dateMessage.classList.remove('show');
    return true;
  }

  $description.innerHTML = dict.dateHint[langPage];
  return false;
}


addListeners([
  {
    dom: D.expMonth,
    event: 'change',
    callback: isCorrectDate,
  },
  {
    dom: D.expYear,
    event: 'change',
    callback: isCorrectDate,
  },
  {
    dom: $close,
    event: 'click',
    callback: onClickCloseMessage,
  },
]);
