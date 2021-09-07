import Sidebar from './components/sidebar/Sidebar.js';
import EditFrame from './components/pageEditSection/EditFrame.js';
import { initRouter, replaceRouter, replace } from './utils/router.js';
import { request } from './utils/api.js';

// 클릭 이벤트 시에 url이 바뀌게 하는 작업 (o)
// 이제 url을 불러와서 id를 뽑아낸 후 editFrame의 id상태를 바꿔줘야 함 ()

export default function App({ $target }) {
  this.state = {
    parentPageId: null,
  };

  this.setState = nextState => {
    this.state = nextState;
  };

  const sidebar = new Sidebar({
    $target,
    initialState: [],
    onChildPageAdd: parentPageId => {
      this.setState({
        parentPageId,
      });

      editFrame.setState({
        ...editFrame.state,
        parentPageId,
      });
    },
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

  sidebar.setState(); // 맨 처음에 목록 불러오기
  // 불러온 목록이 없을 경우 시작하기 페이지 만들어서 넣어주기

  this.route = async () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      editFrame.setState({
        ...this.state,
        id: 'new',
      });
    } else if (pathname.indexOf('/pages/') === 0) {
      const [, , pageId] = pathname.split('/');
      if (pageId === 'new') {
        const createdPage = await request(`/documents/`, {
          method: 'POST',
          body: JSON.stringify({
            title: null,
            parent: this.state.parentPageId ? this.state.parentPageId : null,
          }),
        });
        replace(`/pages/${createdPage.id}`);
        sidebar.setState();
        this.state.parentPageId = null;
      }
      editFrame.setState({
        ...editFrame.state,
        id: isNaN(pageId) ? pageId : parseInt(pageId),
      });
    }
  };

  // route()가 중복되는 것 같은데 어떻게 리팩토링해야할지 모르겠다
  this.route();

  initRouter(() => this.route());
  replaceRouter(() => this.route());

  window.addEventListener('popstate', () => {
    this.route();
  });
}
