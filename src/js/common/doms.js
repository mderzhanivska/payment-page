
export const getDom = selector => document.querySelector(selector);

export default {
  form: getDom('.js-card-number'),

  cardNumber: getDom('#cardNumber'),
  cardType: getDom('.js-card-type span'),
  captionMessage: getDom('.js-caption-message'),

  date: getDom('.date-field'),
  expYear: getDom('#ExpYear'),
  expMonth: getDom('#ExpMonth'),
  dateMessage: getDom('.js-date-message'),

  cvv: getDom('#cvv'),
  cvvMessage: getDom('.js-cvv-message'),
  cvvBtnDone: getDom('.done-btn-cvv'),
  cvvKeyboard: getDom('#keyboard'),
};
