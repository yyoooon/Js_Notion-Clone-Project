// 에디터에 어떤 내용을 전해줄 것인지 정하는 컴포넌트
// 서버, 스토리지에서 데이터를 받음
import { request, getDocumentsData } from "../../utils/api.js";
import { setItem, getItem, removeItem } from "../../utils/storage.js";
import Editor from "./Editor.js";

export default function EditFrame({ $target, initialState }) {
  const $editFrame = document.createElement("section");
  $editFrame.classList.add("edit_frame");

  this.state = initialState;

  // 초기 설정 id: init
  // 현 id와 새로운 id가 같을 경우: 새로 고침 한 경우 ->  그냥 this.state로 렌더링
  // 다를 경우: 다른 페이지로 이동한 경우 -> 이동한 페이지의 데이터를 불러와서 렌더링
  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      this.state = nextState;

      if (this.state.id === "new") {
        this.state = {
          ...this.state,
          title: "",
          content: "",
        };
      } else {
        fetchPost();
      }
    }
    editor.setState(this.state);
  };

  const editor = new Editor({
    $target: $editFrame,
    initialState: this.state,
    // 들어온 값으로 저장소의 데이터를 넣어주는 곳
    onEditing: (post) => {
      console.log(post);
    },
  });

  let postLocalSaveKey;
  // 후에 로컬스토리지의 데이터와 생성 시간을 비교해서 더 최근 것으로 전달해주는 작업 필요
  const fetchPost = async () => {
    const { id } = this.state;
    // const document = await request(`/documents/${id}`, {
    //   method: "GET",
    // });
    this.setState(await getDocumentsData(id));
  };

  $target.appendChild($editFrame);
}
