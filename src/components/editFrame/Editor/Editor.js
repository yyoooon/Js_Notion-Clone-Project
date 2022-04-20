import Component from '../../base/Component';

class Editor extends Component {
  setup() {
    this.state = this.props;
  }

  template() {
    return `
      <div class='editor'>
        <input type='text' name='title' value='${this.state.title}' placeholder='제목 없음' />
        <textarea name='content' placeholder='내용을 적어주세요'>${this.state.content}</textarea>
      </div>
    `;
  }

  setEvent() {
    const { onChangeTitle, onChangeContent } = this.props;
    const $input = this.$target.querySelector('[name="title"]');
    const $textarea = this.$target.querySelector('[name="content"]');

    $input.addEventListener('input', onChangeTitle);
    $textarea.addEventListener('input', onChangeContent);
  }
}

export default Editor;
