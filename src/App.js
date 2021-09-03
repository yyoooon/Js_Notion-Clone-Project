import Sidebar from "./components/sidebar/Sidebar.js";
import EditFrame from "./components/pageEditSection/EditFrame.js";
import { initRouter } from "./utils/router.js";

// 클릭 이벤트 시에 url이 바뀌게 하는 작업 (o)
// 이제 url을 불러와서 id를 뽑아낸 후 editFrame의 id상태를 바꿔줘야 함 ()

export default function App({ $target }) {
  const sidebar = new Sidebar({
    $target,
    initialState: [],
  });

  const editFrame = new EditFrame({
    $target,
    initialState: {
      id: "init",
      title: "안녕하세요",
      content: "시작해보세요",
      documents: [],
      createdAt: "",
      updatedAt: "",
    }, // 후에 로컬 스토리지에서 불러올 것 (남아있는 값이 있는 경우)
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      sidebar.setState();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      sidebar.setState();
      editFrame.setState({
        ...editFrame.state,
        id: postId,
      });
    }
  };

  this.route();
  initRouter(() => this.route());
}
