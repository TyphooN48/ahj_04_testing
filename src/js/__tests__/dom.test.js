import CardFormWidget from '../CardWidget';

test('should render self', () => {
  document.body.innerHTML = '<div id="widget-container"></div>';
  const container = document.querySelector('#widget-container');
  const widget = new CardFormWidget(container);
  widget.bindToDOM();

  expect(container.innerHTML).toEqual(CardFormWidget.markup);
});

test.each([
  ['should hightlight card visa', '4', 'visa'],
  ['should hightlight card master', '52', 'master'],
  ['should hightlight card maestro', '50', 'maestro'],
  ['should hightlight card mir', '2', 'mir'],
  ['should not highlight cards', '38', ''],
])(('%s'), (_, input, expected) => {
  document.body.innerHTML = '<div id="widget-container"></div>';
  const container = document.querySelector('#widget-container');
  const widget = new CardFormWidget(container);
  widget.bindToDOM();

  const inputText = container.querySelector(CardFormWidget.inputSelector);
  inputText.value = input;

  const event = new Event('input');
  inputText.dispatchEvent(event);

  let result = null;
  widget.cardList.forEach((item) => {
    if (item.classList.contains(expected)) {
      if (!item.classList.contains('cdisabled')) {
        result = true;
      }
    } else if (expected === '') {
      result = true;
    }
  });
  expect(result).toBe(true);
});

test.each([
  ['should show valid', '5555555555554444', 'valid'],
  ['should show invalid', '555555555555444', 'invalid'],
])(('%s'), (_, input, expected) => {
  document.body.innerHTML = '<div id="widget-container"></div>';
  const container = document.querySelector('#widget-container');
  const widget = new CardFormWidget(container);
  widget.bindToDOM();

  const formInput = container.querySelector(CardFormWidget.inputSelector);
  formInput.value = input;
  const submit = container.querySelector(CardFormWidget.submitSelector);
  submit.click();
  expect(widget.showResult.classList.contains(expected)).toBe(true);
});

test('should clear form', () => {
  document.body.innerHTML = '<div id="widget-container"></div>';
  const container = document.querySelector('#widget-container');
  const widget = new CardFormWidget(container);
  widget.bindToDOM();

  const input = container.querySelector(CardFormWidget.inputSelector);
  input.value = '4111111111111111';
  const submit = container.querySelector(CardFormWidget.submitSelector);
  submit.click();
  widget.clearForm();
  expect(container.innerHTML).toEqual(CardFormWidget.markup);
});
