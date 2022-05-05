import Component from './components/base/Component.js';
import Sidebar from './views/Sidebar.js';
import EditFrame from './views/EditFrame.js';
import { pushRouter, replaceRouter, popStateRouter } from './routes/router.js';
import { getDocument } from './api/apis.js';

class App extends Component {
  template() {
    return `
      <aside class="sidebar"></aside>
      <section class="edit_frame"></section>
    `;
  }

  async route() {
    const { pathname } = window.location;

    if (pathname === '/') {
      this.EditFrame.setState(
        {
          id: '',
          title: '윤의 노션입니다',
          content: '문서를 작성해보세요',
        },
        true,
      );
    }

    if (pathname.indexOf('/pages/') === 0) {
      const [, , pageId] = pathname.split('/');
      const { title, content } = await getDocument(pageId);
      this.EditFrame.setState(
        {
          id: pageId,
          title,
          content,
        },
        true,
      );
    }
  }

  setInitRouter() {
    this.route();

    pushRouter(() => {
      this.route();
    });
    replaceRouter(() => {
      this.route();
    });
    popStateRouter(() => {
      this.route();
    });
  }

  mounted() {
    const $sidebar = this.$target.querySelector('.sidebar');
    const $editFrame = this.$target.querySelector('.edit_frame');
    this.Sidebar = new Sidebar($sidebar);
    this.EditFrame = new EditFrame($editFrame, {
      id: '',
      title: '',
      content: '',
      onUpdatePageList: () => {
        this.Sidebar.fetch();
      },
    });
    this.setInitRouter($editFrame);
  }
}

export default App;
