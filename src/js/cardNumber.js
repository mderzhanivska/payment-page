import D from './common/doms';
import { addListeners } from './common/utils';


let oldValue;
const regex = new RegExp(/^\d{0,16}$/g);

const mask = (value) => {
  const output = [];

  for (let i = 0; i < value.length; i += 1) {
    if (i !== 0 && i % 4 === 0) {
      output.push(' '); // add the separator
    }
    output.push(value[i]);
  }

  return output.join('');
};


const unmask = value => value.replace(new RegExp(/[^\d]/, 'g'), '');


const handlerKeydownCard = ({ target }) => {
  oldValue = target.value;
};


const handleChangeCard = ({ target }) => {
  let { value } = target;
  value = unmask(value);

  D.cardNumber.value = value.match(regex)
    ? mask(value)
    : oldValue;
};


addListeners([
  {
    dom: D.cardNumber,
    event: 'keydown',
    callback: handlerKeydownCard,
  },
  {
    dom: D.cardNumber,
    event: 'input',
    callback: handleChangeCard,
  },
]);
