import Component from '../../base/Component.js';
import PageItem from './PageItem.js';
import { createElement, addClass } from '../../../utils/createElement.js';
import { push } from '../../../routes/router.js';
import { setItem, getItem } from '../../../utils/storage.js';

class PageList extends Component {
  setup() {
    this.state = this.props;
  }

  template() {
    return `
      <ul id="root" class="page_list"></ul>
    `;
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

  createChildrenPages(childrenData, parentEl, isOpenChild) {
    const childItemContainer = createElement('ul');
    addClass(childItemContainer, ['page_list']);
    isOpenChild && addClass(childItemContainer, ['visible']);

    parentEl.$node.appendChild(childItemContainer);
    childrenData.length
      ? this.createPageItems(childrenData, childItemContainer)
      : this.createEmptyItem(childItemContainer);
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

  changeToggleIcon(target, children, pageId) {
    const isClose = target.classList.contains('fa-caret-right');
    const isOpen = target.classList.contains('fa-caret-down');

    if (isClose) {
      target.classList.replace('fa-caret-right', 'fa-caret-down');
      children && children.classList.toggle('visible');

      const openedPages = getItem('openedPages', []);
      setItem('openedPages', [...openedPages, pageId]);
      return;
    }

    if (isOpen) {
      target.classList.replace('fa-caret-down', 'fa-caret-right');
      children && children.classList.toggle('visible');

      const openedPages = getItem('openedPages', []);
      setItem(
        'openedPages',
        openedPages.filter(v => v !== pageId),
      );
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

      if (!pageId) return;
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
