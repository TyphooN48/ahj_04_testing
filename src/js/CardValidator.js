export default class CardValidator {
  constructor() {
    this.cardTypes = [
      { start: '4', type: 'visa' },
      { start: '51', type: 'master' },
      { start: '52', type: 'master' },
      { start: '53', type: 'master' },
      { start: '54', type: 'master' },
      { start: '55', type: 'master' },
      { start: '50', type: 'maestro' },
      { start: '58', type: 'maestro' },
      { start: '63', type: 'maestro' },
      { start: '67', type: 'maestro' },
      { start: '2', type: 'mir' },
    ];
  }

  paySystem(value) {
    let result = null;
    this.cardTypes.forEach((item) => {
      if (value.startsWith(item.start)) {
        result = item.type;
      }
    });
    return result;
  }

  static isValid(value) {
    const internalValue = value.replace(/\D/g, '');
    let nCheck = 0;
    let bEven = false;
    // eslint-disable-next-line no-plusplus
    for (let n = internalValue.length - 1; n >= 0; n--) {
      let nDigit = parseInt(value.charAt(n), 10);
      // eslint-disable-next-line no-cond-assign
      if (bEven && (nDigit *= 2) > 9) {
        nDigit -= 9;
      }
      nCheck += nDigit;
      bEven = !bEven;
    }
    return (nCheck % 10) === 0;
  }
}
