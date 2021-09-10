export default function ClickButton({ $target, initialState, onClick }) {
  const $linkButton = document.createElement('button');
  $target.appendChild($linkButton);

  this.state = initialState;

  this.render = () => {
    $linkButton.textContent = this.state.text;
    $linkButton.classList.add(this.state.className);
  };
  this.render();

  $linkButton.addEventListener('click', () => {
    onClick();
  });
}
