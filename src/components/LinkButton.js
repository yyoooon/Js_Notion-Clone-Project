import { push } from "../router.js";

export default function LinkButton({ $target, initialState }) {
  const $linkButton = document.createElement("button");
  $target.appendChild($linkButton);

  this.state = initialState;

  this.render = () => {
    $linkButton.textContent = this.state.text;
    $linkButton.classList.add(this.state.className);
  };
  this.render();

  $linkButton.addEventListener("click", () => {
    console.log("new");
    push(this.state.link);
  });
}
