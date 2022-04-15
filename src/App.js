import Component from './components/base/Component.js';
import Sidebar from './views/Sidebar.js';
import EditFrame from './views/EditFrame.js';
import { pushRouter, replaceRouter, popStateRouter } from './routes/router.js';

class App extends Component {
  Sidebar;
  EditFrame;

  template() {
    return `
      <aside class="sidebar"></aside>
      <section class="edit_frame"></section>
    `;
  }

  route() {
    const { pathname } = window.location;

    if (pathname === '/') {
      return;
    }

    if (pathname.indexOf('/pages/') === 0) {
      const [, , pageId] = pathname.split('/');
      console.log(pageId);
      return;
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
    this.EditFrame = new EditFrame($editFrame);

    this.setInitRouter();
  }
}

export default App;
