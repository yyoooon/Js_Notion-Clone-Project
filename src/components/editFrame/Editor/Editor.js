import Component from '../../base/Component';

class Editor extends Component {
  $input;
  $textarea;

  setup() {
    const { title, content } = this.props;
    this.state = {
      title,
      content,
    };
  }

  template() {
    return `
      <div class='editor'>
        <input type='text' name='title' value='${
          this.state.title || ''
        }' placeholder='제목 없음' />
        <textarea name='content' placeholder='내용을 적어주세요'>${
          this.state.content || ''
        }</textarea>
      </div>
    `;
  }

  setCursorToEnd(target) {
    const maxLength = target.value.length;
    target.setSelectionRange(maxLength, maxLength);
  }

  setFocus() {
    if (!this.$input.value) {
      this.$input.focus();
      return;
    }
    this.$textarea.focus();
    this.setCursorToEnd(this.$textarea);
  }

  mounted() {
    this.setEvent();
  }

  setEvent() {
    const { onUpdateContent } = this.props;
    this.$input = this.$target.querySelector('[name="title"]');
    this.$textarea = this.$target.querySelector('[name="content"]');

    this.setFocus();
    this.$input.addEventListener('keyup', onUpdateContent);
    this.$textarea.addEventListener('keyup', onUpdateContent);
  }
}

export default Editor;
