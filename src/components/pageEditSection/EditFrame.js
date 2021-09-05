// 에디터에 어떤 내용을 전해줄 것인지 정하는 컴포넌트
// 서버, 스토리지에서 데이터를 받음
import { request } from '../../utils/api.js';
import { replace } from '../../utils/router.js';
import { setItem, getItem, removeItem } from '../../utils/storage.js';
import Editor from './Editor.js';

export default function EditFrame({ $target, initialState }) {
  const $editFrame = document.createElement('section');
  $editFrame.classList.add('edit_frame');

  this.state = initialState;

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
              title: page.title ? page.title : '제목 없음',
              content: null,
            }),
          });
          replace(`/pages/${createdPage.id}`);

          this.setState({
            // 생성 후 자식 바꿔주기
            id: createdPage.id,
          });
        } else {
          await request(`/documents/${page.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: page.title,
              content: page.content,
            }),
          });

          this.setState({
            // 수정 후 자식 바꿔주기
            ...this.state,
            title: page.title,
            content: page.content,
          });
        }
      }, 2000);
    },
  });

  const fetchPage = async () => {
    const { id } = this.state;
    if (id !== undefined) {
      const getDocumentsData = await request(`/documents/${id}`, {
        method: 'GET',
      });
      this.setState(getDocumentsData);
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

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
    this.state = nextState;

    editor.setState(
      // 처음부터 new로 들어온 경우
      this.state || {
        // 가져온 데이터가 없다면 빈 텍스트
        title: '',
        content: '',
      },
    );
  };

  let pageLocalSaveKey;
  // 후에 로컬스토리지의 데이터와 생성 시간을 비교해서 더 최근 것으로 전달해주는 작업 필요

  $target.appendChild($editFrame);
}
