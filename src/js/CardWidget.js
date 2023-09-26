import CardValidator from './CardValidator';

export default class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.cardList = null;
    this.showResult = null;
    this.validator = new CardValidator();
  }

  static get markup() {
    return `
      <div data-id="card-validator-widget" class="card-validator">
        <h3>Check your credit card number</h3>
        <ul class="cards list-unstyled">
          <li><span class="card visa" title="Visa">Visa</span></li>
          <li><span class="card master" title="Mastercard">Mastercard</span></li>
          <li><span class="card maestro" title="Maestro">Maestro</span></li>
          <li><span class="card mir" title="Discover">Mir</span></li>
        </ul>
        <form id="form" class="form-inline" novalidate="novalidate">
          <div class="form-group">
            <input class="form-control" data-id="card_number" name="card_number" type="text" placeholder="Credit card number" data-original-title="" title="">
            <a data-id="submitform" class="btn btn-success">Click to Validate</a>
          </div>
        </form>
        <div class="validation-result_container">
          <span data-id="validation-result" class="validation-result"></span>
        </div>
        <h3>Example credit card numbers</h3>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Credit Card Type</th>
              <th>Credit Card Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Visa</td>
              <td>4111111111111111</td>
            </tr>
            <tr>
              <td>MasterCard</td>
              <td>5555555555554444</td>
            </tr>
            <tr>
              <td>Maestro</td>
              <td>6759416504627850</td>
            </tr>
            <tr>
              <td>Mir</td>
              <td>2201382000000013</td> 
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  static get inputSelector() {
    return '[data-id=card_number]';
  }

  static get submitSelector() {
    return '[data-id=submitform]';
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    this.showResult = this.parentEl.querySelector('[data-id=validation-result]');
    this.cardList = Array.from(this.parentEl.querySelectorAll('.card'));
    const submit = this.parentEl.querySelector(this.constructor.submitSelector);
    const input = this.parentEl.querySelector(this.constructor.inputSelector);
    submit.addEventListener('click', (e) => this.onSubmit(e));
    input.addEventListener('input', (e) => this.onInput(e));
  }

  clearForm() {
    this.showResult.classList.remove('invalid', 'valid');
    this.showResult.textContent = '';
    this.cardList.forEach((item) => {
      item.classList.remove('cdisabled');
    });
  }

  onInput(e) {
    e.preventDefault();
    this.clearForm();
    const inputEl = this.parentEl.querySelector(this.constructor.inputSelector);
    const validatorValue = this.validator.paySystem(inputEl.value);
    if (validatorValue !== null) {
      this.cardList.forEach((item) => {
        if (!item.classList.contains(validatorValue)) {
          item.classList.add('cdisabled');
        }
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const inputEl = this.parentEl.querySelector(this.constructor.inputSelector);
    if (CardValidator.isValid(inputEl.value)) {
      this.showResult.classList.add('valid');
      this.showResult.textContent = 'Valid';
    } else {
      this.showResult.classList.add('invalid');
      this.showResult.textContent = 'Invalid';
    }
  }
}
