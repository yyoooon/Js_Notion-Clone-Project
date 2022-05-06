import Component from '../components/base/Component.js';
import Editor from '../components/editFrame/Editor/Editor.js';
import { updateDocument } from '../api/apis.js';

class EditFrame extends Component {
  timer = null;

  setup() {
    this.state = this.props;
  }

  handleUpdateContent(e) {
    const { id } = this.state;
    if (!id) return;

    const { name, value } = e.target;
    this.state[name] = value;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(async () => {
      await updateDocument({
        postId: id,
        title: this.state.title,
        content: this.state.content,
      });
      name === 'title' && this.state.onUpdatePageList();
    }, 300);
  }

  mounted() {
    const { title, content } = this.state;
    this.Editor = new Editor(this.$target, {
      title,
      content,
      onUpdateContent: this.handleUpdateContent.bind(this),
    });
  }

  reRender() {
    const { title, content } = this.state;
    this.Editor.setState({
      title,
      content,
    });
  }
}

export default EditFrame;
