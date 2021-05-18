import { dict } from '../../config';
import { addListeners, langPage } from '../common/utils';

import D from '../common/doms';
import { onClickCloseMessage } from './common';

const $close = D.cvvMessage.querySelector('.close');
const $description = D.cvvMessage.querySelector('.description');


export const isCorrectCvv = () => {
  const { value } = D.cvv;
  const isEmpty = value.length === 0;

  if (isEmpty || value.length < 3) {
    const dictMsg = isEmpty ? 'cvvHint' : 'cvvHintLength';
    $description.innerHTML = dict[dictMsg][langPage];

    D.cvvMessage.classList.add('show');
    return false;
  }

  D.cvvMessage.classList.remove('show');
  return true;
};

addListeners([
  {
    dom: D.cvv,
    event: 'input',
    callback: isCorrectCvv,
  },
  {
    dom: $close,
    event: 'click',
    callback: onClickCloseMessage,
  },
]);
