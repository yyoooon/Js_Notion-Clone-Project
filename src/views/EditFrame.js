import Component from '../components/base/Component.js';
import Editor from '../components/editFrame/Editor/Editor.js';
import { getDocument } from '../api/apis.js';

class EditFrame extends Component {
  setup() {
    this.state = {
      id: '',
    };
  }

  async mounted() {
    const { id } = this.state;
    if (!id) return;
    const pageData = await getDocument(id);
    const { title, content } = pageData;

    this.Editor = new Editor(this.$target, {
      title: title,
      content: content || '',
    });
  }
}

export default EditFrame;
