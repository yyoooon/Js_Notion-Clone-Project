import Component from '../../base/Component.js';
import PageItem from './PageItem.js';
import { createElement, addClass } from '../../../utils/createElement.js';
import { push } from '../../../routes/router.js';
import { setItem, getItem } from '../../../utils/storage.js';

class PageList extends Component {
  openedPagesArr = [];

  setup() {
    this.state = this.props;
  }

  template() {
    return `
      <ul id="root" class="page_list"></ul>
    `;
  }

  // 처음 렌더링할 경우 - 삭제, 추가 등 모든 데이터 변경 때마다 실행됨
  // 각 아이템을 만들 때 세션에 자신의 id가 존재한다면
  // 1. 토글 아이콘을 아래로
  // 2. 자식 ul을 보이도록
  // 데이터는 가져오지만 렌더링을 어떻게 할지를 정하는 것
  // 자식이 없으면 하위 문서가 없습니다. 달기

  createChildrenPages(childrenData, parentEl, isOpenChild) {
    const childItemContainer = createElement('ul');
    addClass(childItemContainer, ['page_list']);
    isOpenChild && addClass(childItemContainer, ['visible']);

    parentEl.$node.appendChild(childItemContainer); // ul을 붙힘
    childrenData.length
      ? this.createPageItems(childrenData, childItemContainer)
      : this.createEmptyItem(childItemContainer);
  }

  createPageItems(data, itemContainer) {
    itemContainer.innerHTML = '';
    const openedPages = getItem('openedPages', []);
    data.length &&
      data.map(({ id, title, documents }) => {
        let isOpenChild = false;
        if (openedPages.includes(String(id))) {
          isOpenChild = true;
        }
        const pageItem = new PageItem(itemContainer, {
          id,
          title,
          isOpenChild,
        });
        this.createChildrenPages(documents, pageItem, isOpenChild);
      });
  }

  createEmptyItem(itemContainer) {
    itemContainer.innerHTML = `
      <li class='page'>
        <div class="page_focuable_elements">
          <h3 class="page_name">하위 문서가 없습니다</h3>
        </div>
      </li>
    `;
  }

  mounted() {
    const { data } = this.state;
    const $pageList = document.getElementById('root');
    this.createPageItems(data, $pageList);
    this.setEvent();
  }

  // 이후 변경할 경우
  changeToggleIcon(target, children, pageId) {
    const isClose = target.classList.contains('fa-caret-right');
    const isOpen = target.classList.contains('fa-caret-down');

    if (isClose) {
      target.classList.replace('fa-caret-right', 'fa-caret-down');
      children && children.classList.toggle('visible');

      this.openedPagesArr.push(pageId);
      setItem('openedPages', this.openedPagesArr);
      return;
    }

    if (isOpen) {
      target.classList.replace('fa-caret-down', 'fa-caret-right');
      children && children.classList.toggle('visible');

      this.openedPagesArr = this.openedPagesArr.filter(v => v !== pageId);
      setItem('openedPages', this.openedPagesArr);
      return;
    }
  }

  setEvent() {
    const $pageList = document.getElementById('root');
    $pageList.addEventListener('click', e => {
      const { onClickDelete, onClickCreate } = this.state;
      const { className } = e.target;
      const pageItem = e.target.closest('.page');
      const pageId = pageItem.dataset.id;
      const children = pageItem.querySelector('.page_list');

      this.changeToggleIcon(e.target, children, pageId);

      switch (className) {
        case 'page_name':
          push(`/pages/${pageId}`);
          break;
        case 'page_removeButton':
          onClickDelete(pageId);
          break;
        case 'page_add_pageButton':
          onClickCreate({ title: '', parentId: pageId });
          break;
        default:
      }
    });
  }
}

export default PageList;
