export default function EditFrameEditor({ $target, initialState, onEditing }) {
  const $editFrameEditor = document.createElement("div");
  $editFrameEditor.classList.add("editor");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  let isinitialize = false;

  this.render = () => {
    if (!isinitialize) {
      $editFrameEditor.innerHTML = `
      <input type="text" name="title" value="${this.state.title}" placeholder="제목없음" />
      <textarea name="content" placeholder="내용을 적어주세요">${this.state.content}</textarea>`;
      isinitialize = true;
      return;
    }
    $editFrameEditor.querySelector("[name=title]").value = this.state.title; // 속성 선택자
    $editFrameEditor.querySelector("[name=content]").value = this.state.content;
  };

  // 내 상태를 바꿔야 한다
  $editFrameEditor.addEventListener("keyup", (e) => {
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
  $target.appendChild($editFrameEditor);
}
