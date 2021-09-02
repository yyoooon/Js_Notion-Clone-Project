import Sidebar from "./components/postListPage/Sidebar.js";
import EditFrame from "./components/postEditPage/EditFrame.js";
import { initRouter } from "./router.js";

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
      id: "new",
      title: "초기 내용",
      content: "초기 내용",
      documents: [],
      createdAt: "",
      updatedAt: "",
    },
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
        id: parseInt(postId),
      });
    }
  };

  this.route();
  initRouter(() => this.route());
}
