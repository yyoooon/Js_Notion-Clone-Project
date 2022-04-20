import Component from '../components/base/Component.js';
import Editor from '../components/editFrame/Editor/Editor.js';
import { updateDocument } from '../api/apis.js';

class EditFrame extends Component {
  setup() {
    this.state = this.props;
  }

  async handleChangeTitle(e) {
    const { id } = this.state;
    this.state.title = e.target.value;
    await updateDocument({
      postId: id,
      title: this.state.title,
      content: this.state.content,
    });
    this.state.onUpdatePageList();
  }

  async handleChangeContent(e) {
    const { id } = this.state;
    this.state.content = e.target.value;

    await updateDocument({
      postId: id,
      title: this.state.title,
      content: this.state.content,
    });
  }

  mounted() {
    const { title, content } = this.state;
    this.Editor = new Editor(this.$target, {
      title,
      content,
      onChangeTitle: this.handleChangeTitle.bind(this),
      onChangeContent: this.handleChangeContent.bind(this),
    });
  }
}

export default EditFrame;
