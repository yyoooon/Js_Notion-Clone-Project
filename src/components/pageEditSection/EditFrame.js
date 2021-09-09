// 에디터에 어떤 내용을 전해줄 것인지 정하는 컴포넌트
// 서버, 스토리지에서 데이터를 받음
import { request } from '../../utils/api.js';
import { replace } from '../../utils/router.js';
// import { setItem, getItem, removeItem } from '../../utils/storage.js';
import Editor from './Editor.js';

export default function EditFrame({ $target, initialState, onListChange }) {
  const $editFrame = document.createElement('section');
  $editFrame.classList.add('edit_frame');

  this.state = initialState;
  // let pageLocalSaveKey;
  // id가 다르면 현재 상태를 id로 바꿔주고 데이터를 가져옴
  // 가져온 데이터를 다음 상태로 넣어은 후 지금 상태로 바꿔줌 - id가 같은데 내용이 생성된 것
  this.setState = async nextState => {
    if (this.state.id !== nextState.id) {
      this.state = nextState;
      if (this.state.id === 'new') {
        this.state = {
          ...this.state,
          title: '',
          content: '',
        };
        editor.setState(this.state);
      } else {
        fetchPage();
      }
      return;
    }
    this.state = nextState; // 수정된 새로운 내용담아서 바꾸기

    editor.setState(
      this.state || {
        // 가져온 데이터가 없다면 빈 텍스트
        title: '',
        content: '',
      },
    );
  };

  let timer = null;
  const editor = new Editor({
    $target: $editFrame,
    initialState: this.state,
    // 들어온 값으로 저장소의 데이터를 넣어주는 곳
    onEditing: page => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        if (page.id === 'new') {
          const createdPage = await request(`/documents/`, {
            method: 'POST',
            body: JSON.stringify({
              title: page.title,
              parent: this.state.parentId ? this.state.parentId : null,
            }),
          });
          replace(`/pages/${createdPage.id}`);
          onListChange();
        } else {
          // 데이터 수정 후 화면 업데이트 하기
          await request(`/documents/${page.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: page.title,
              content: page.content,
            }),
          });
          // 같은 url에서 화면만 바꿔주기 - url이 같으면 서버에서 안 불러오기 때문에 내용까지 전부 다 넣어줘야 함
          // 이 자체가 fetch의 과정, 불러오느냐 수정하고 수정한 내용을 보내느냐
          this.setState({
            ...this.state,
            id: page.id,
            title: page.title,
            content: page.content,
          });
          onListChange();
        }
      }, 200);
    },
  });

  const fetchPage = async () => {
    const { id } = this.state;
    if (id !== undefined) {
      const getDocumentsData = await request(`/documents/${id}`, {
        method: 'GET',
      });
      this.setState(getDocumentsData);
    }
    // 후에 로컬스토리지의 데이터와 생성 시간을 비교해서 더 최근 것으로 전달해주는 작업 필요
  };

  $target.appendChild($editFrame);
}

// 값이 넣어질때마다 렌더링이 됨..
