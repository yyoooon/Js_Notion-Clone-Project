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

  async route(target) {
    const { pathname } = window.location;

    if (pathname === '/') {
      new EditFrame(target, {
        id: '',
        title: '윤의 노션입니다',
        content: '문서를 작성해보세요!',
      });
      return;
    }

    if (pathname.indexOf('/pages/') === 0) {
      const [, , pageId] = pathname.split('/');
      const { title, content } = await getDocument(pageId);
      new EditFrame(target, {
        id: pageId,
        title,
        content,
        onUpdatePageList: () => {
          this.Sidebar.fetch();
        },
      });
      return;
    }
  }

  setInitRouter(target) {
    this.route(target);

    pushRouter(() => {
      this.route(target);
    });
    replaceRouter(() => {
      this.route(target);
    });
    popStateRouter(() => {
      this.route(target);
    });
  }

  mounted() {
    const $sidebar = this.$target.querySelector('.sidebar');
    this.Sidebar = new Sidebar($sidebar);
    const $editFrame = this.$target.querySelector('.edit_frame');
    this.setInitRouter($editFrame);
  }
}

export default App;
