// 리스트 데이터를 받아와서 리스트 컴포넌트에 전해주는 컴포넌트
// 서버, 스토리지에서 데이터를 받음
import PageList from './PageList.js';
import ClickButton from '../LinkButton.js';
import { request } from '../../utils/api.js';
import { push } from '../../utils/router.js';

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement('aside');
  $sidebar.classList.add('sidebar');

  this.state = initialState;

  this.setState = async () => {
    const pages = await request(`/documents`, {
      method: 'GET',
    });
    pageList.setState(pages);
  };

  let isinitialize = false;
  this.render = () => {
    // 돔으로 만들기!
    if (!isinitialize) {
      $sidebar.innerHTML = `
    <div class="sidebar_contents_wrap"></div> 
    `;
      isinitialize = true;
    }
  };

  this.render();

  const creatNewPage = async (parentId = null) => {
    // 새로운 페이지 생성
    const createdPage = await request(`/documents/`, {
      method: 'POST',
      body: JSON.stringify({
        title: null,
        parent: parentId || null,
      }),
    });
    push(`/pages/${createdPage.id}`);

    // 리스트 목록 업데이트
    this.setState();
  };

  const $sidebarContentsWrap = $sidebar.querySelector('.sidebar_contents_wrap');

  const pageList = new PageList({
    $target: $sidebarContentsWrap,
    initialState: this.state,
    onRemove: async deletePageid => {
      await request(`/documents/${deletePageid}`, {
        method: 'DELETE',
      });
      this.setState();
      // 삭제하려는 페이지와 현재 url이 같을 때 뒤로가기
      const { pathname } = window.location;
      const [, , currentPageId] = pathname.split('/');
      if (deletePageid === currentPageId) {
        history.back();
      }
    },
    onChildPageAdd: parentId => {
      // 새로운 페이지 생성
      creatNewPage(parentId);
    },
  });

  // eslint-disable-next-line no-new
  new ClickButton({
    $target: $sidebarContentsWrap,
    initialState: {
      text: '➕ 페이지 추가',
      link: `/pages/new`,
      className: 'create_page_button',
    },
    onClick: () => {
      creatNewPage();
    },
  });

  $target.appendChild($sidebar);
}
