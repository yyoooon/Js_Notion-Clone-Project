// 에디터에 어떤 내용을 전해줄 것인지 정하는 컴포넌트
// 서버, 스토리지에서 데이터를 받음
import { request } from "../../api.js";
import { setItem, getItem, removeItem } from "../../storage.js";
import EditFrameEditor from "./EditFrameEditor.js";

export default function EditFrame({ $target, initialState }) {
  const $editFrame = document.createElement("section");
  $editFrame.classList.add("edit_frame");

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;
    if (this.state.id !== "new") {
      const document = await request(`/documents/${this.state.id}`, {
        method: "GET",
      });
      this.state = document;
      console.log(this.state);
      editFrameEditor.setState(document);
    }
    this.render();
  };

  this.render = () => {
    $target.appendChild($editFrame);
  };

  const editFrameEditor = new EditFrameEditor({
    $target: $editFrame,
    initialState: this.state,
    onEditing: (post) => {
      console.log(post);
    },
  });

  let postLocalSaveKey;
  // const fetchPost = async (postId) => {
  //   const document = await request(`/documents/${postId}`, {
  //     method: "GET",
  //   });
  //   this.setState(document);
  // };
}
