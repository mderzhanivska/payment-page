import valid from 'card-validator';

valid.creditCardType.addCard({
  niceType: 'Prostir',
  type: 'prostir',
  patterns: [
    9999,
  ],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: 'CVV',
    size: 3,
  },
});

export default valid;
