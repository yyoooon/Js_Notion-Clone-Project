import Sidebar from './components/sidebar/Sidebar.js';
import EditFrame from './components/pageEditSection/EditFrame.js';
import { initRouter, replaceRouter } from './utils/router.js';

// 클릭 이벤트 시에 url이 바뀌게 하는 작업 (o)
// 이제 url을 불러와서 id를 뽑아낸 후 editFrame의 id상태를 바꿔줘야 함 ()

export default function App({ $target }) {
  const sidebar = new Sidebar({
    $target,
    initialState: [],
    onChildPageAdd: parentId => {
      editFrame.setState({
        ...editFrame.state,
        parentId,
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
      editFrame.setState({
        ...editFrame.state,
        id: isNaN(pageId) ? pageId : parseInt(pageId),
      });
    }
  };

  this.route();

  initRouter(() => this.route());
  replaceRouter(() => this.route());

  window.addEventListener('popstate', () => {
    this.route();
  });
}
