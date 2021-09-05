// 리스트 데이터를 받아와서 리스트 컴포넌트에 전해주는 컴포넌트
// 서버, 스토리지에서 데이터를 받음
import PageList from './PageList.js';
import LinkButton from '../LinkButton.js';
import { request } from '../../utils/api.js';

export default function Sidebar({ $target, initialState, onChildPageAdd }) {
  const $sidebar = document.createElement('aside');
  $sidebar.classList.add('sidebar');

  this.state = initialState;

  let isinitialize = false;
  this.render = () => {
    if (!isinitialize) {
      $sidebar.innerHTML = `
    <div class="sidebar_contents_wrap"></div>
    `;
      isinitialize = true;
    }
  };

  this.render();

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
      onChildPageAdd(parentId);
    },
  });

  // eslint-disable-next-line no-new
  new LinkButton({
    $target: $sidebarContentsWrap,
    initialState: {
      text: '➕ 페이지 추가',
      link: `/pages/new`,
      className: 'create_page_block_button',
    },
  });

  this.setState = async () => {
    const pages = await request(`/documents`, {
      method: 'GET',
    });
    pageList.setState(pages);
  };

  $target.appendChild($sidebar);
}
