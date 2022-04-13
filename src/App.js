import Component from './components/base/Component.js';
import Sidebar from './views/Sidebar.js';
import EditFrame from './views/EditFrame.js';

class App extends Component {
  template() {
    return `
      <aside class="sidebar"></aside>
      <section class="edit_frame"></section>
    `;
  }
  mounted() {
    const $sidebar = this.$target.querySelector('.sidebar');
    const $editFrame = this.$target.querySelector('.edit_frame');

    new Sidebar($sidebar);
    new EditFrame($editFrame);
  }
}

export default App;
