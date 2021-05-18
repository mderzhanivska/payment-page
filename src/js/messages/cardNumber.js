import { addListeners, langPage } from '../common/utils';
import { dict } from '../../config';
import valid from '../common/cardValidator';

import D from '../common/doms';
import { onClickCloseMessage } from './common';

const $close = D.captionMessage.querySelector('.close');
const $description = D.captionMessage.querySelector('.description');


function validate({ target }) {
  const { value } = target;
  const { isPotentiallyValid, card } = valid.number(value);

  // check card number is valid
  if (value.length > 18 && !isPotentiallyValid) {
    D.captionMessage.classList.add('show');
    $description.innerHTML = dict.cardWrong[langPage];
  } else {
    D.captionMessage.classList.remove('show');
  }

  if (card && card.type) {
    D.cardType.className = '';
    D.cardType.classList.add(card.type);
  } else {
    D.cardType.className = 'hide';
  }
}


addListeners([
  {
    dom: D.cardNumber,
    event: 'input',
    callback: validate,
  },
  {
    dom: $close,
    event: 'click',
    callback: onClickCloseMessage,
  },
]);


export const isCorrectCardNumber = () => {
  const { value } = D.cardNumber;
  const { isValid } = valid.number(value);

  D.captionMessage.classList.add('show');

  if (value.length === 0) {
    $description.innerHTML = dict.cardHint[langPage];
  } else if (value.length !== 19) {
    $description.innerHTML = dict.cardLength[langPage];
  } else if (!isValid) {
    $description.innerHTML = dict.cardWrong[langPage];
  } else {
    D.captionMessage.classList.remove('show');
    return true;
  }

  return false;
};
