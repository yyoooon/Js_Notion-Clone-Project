import Sidebar from './components/sidebar/Sidebar.js';
import EditFrame from './components/pageEditSection/EditFrame.js';
import { pushRouter, replaceRouter } from './utils/router.js';

export default function App({ $target }) {
  const sidebar = new Sidebar({
    $target,
    initialState: [],
  });

  const editFrame = new EditFrame({
    $target,
    initialState: {
      id: '',
      title: '',
      content: '',
      documents: [],
      createdAt: '',
      updatedAt: '',
    },
    onListChange: () => {
      sidebar.setState();
    },
  });

  this.route = async () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      editFrame.setState({
        ...this.state,
        id: 'new',
      });
    } else if (pathname.indexOf('/pages/') === 0) {
      const [, , pageId] = pathname.split('/');
      editFrame.setState({
        ...editFrame.state,
        id: isNaN(pageId) ? pageId : parseInt(pageId),
      });
    }
  };

  // route()가 중복되는 것 같은데 어떻게 리팩토링해야할지 모르겠다
  sidebar.setState();
  this.route();

  pushRouter(this.route);
  replaceRouter(this.route);
  window.addEventListener('popstate', () => {
    this.route();
  });
}
