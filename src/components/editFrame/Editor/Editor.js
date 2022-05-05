import Component from '../../base/Component';

class Editor extends Component {
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
          this.state.title
        }' placeholder='제목 없음' />
        <textarea name='content' placeholder='내용을 적어주세요'>${
          this.state.content || ''
        }</textarea>
      </div>
    `;
  }

  mounted() {
    this.setEvent();
  }

  setEvent() {
    const { onUpdateContent } = this.props;
    const $input = this.$target.querySelector('[name="title"]');
    const $textarea = this.$target.querySelector('[name="content"]');

    $input.addEventListener('keyup', onUpdateContent);
    $textarea.addEventListener('keyup', onUpdateContent);
  }
}

export default Editor;
