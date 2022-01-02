export default function ClickButton({ $target, initialState, onClick }) {
  const $clickButton = document.createElement('button');
  $target.appendChild($clickButton);

  this.state = initialState;

  this.render = () => {
    $clickButton.textContent = this.state.text;
    $clickButton.classList.add(this.state.className);
  };
  this.render();

  $clickButton.addEventListener('click', () => {
    onClick();
  });
}
