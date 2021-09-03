export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.classList.add("editor");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  let isinitialize = false;

  this.render = () => {
    if (!isinitialize) {
      //처음에만 html을 만들어주고 이후에는 값만 바꿔준다
      $editor.innerHTML = `
      <input type="text" name="title" value="${this.state.title}" placeholder="제목없음" />
      <textarea name="content" placeholder="내용을 적어주세요">${this.state.content}</textarea>`;
      isinitialize = true;
      return;
    }
    $editor.querySelector("[name=title]").value = this.state.title; // 속성 선택자
    $editor.querySelector("[name=content]").value = this.state.content;
  };

  // 내 상태를 바꿔야 한다
  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    // 처음엔 빈 텍스트이기 때문에
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value, // 키가 변수일 떈 []로 해줘야 한다
      };
      this.setState(nextState);
      onEditing(this.state); // 제목, 내용을 한 번에 전해주는 것
    }
  });
  this.render();
  $target.appendChild($editor);
}
