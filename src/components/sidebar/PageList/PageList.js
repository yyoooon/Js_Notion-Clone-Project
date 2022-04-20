import Component from '../../base/Component.js';
import PageItem from './PageItem.js';
import { createElement, addClass } from '../../../utils/createElement.js';
import { push } from '../../../routes/router.js';

class PageList extends Component {
  setup() {
    this.state = this.props;
  }

  template() {
    return `
      <ul id="root" class="page_list"></ul>
    `;
  }

  createChildrenPages(childrenData, parentEl) {
    const childItemContainer = createElement('ul');
    addClass(childItemContainer, ['page_list']);

    parentEl.$node.appendChild(childItemContainer);
    this.createPageItems(childrenData, childItemContainer);
  }

  createPageItems(data, itemContainer) {
    itemContainer.innerHTML = '';

    data.length &&
      data.map(({ id, title, documents }) => {
        const pageItem = new PageItem(itemContainer, { id, title });
        const haveChildren = documents.length;
        haveChildren && this.createChildrenPages(documents, pageItem);
      });
  }

  mounted() {
    const { data } = this.state;
    const $pageList = document.getElementById('root');
    this.createPageItems(data, $pageList);
  }

  changeToggleIcon(target, children) {
    if (target.classList.contains('fa-caret-right')) {
      target.classList.replace('fa-caret-right', 'fa-caret-down');
      children && children.classList.toggle('visible');
      return;
    }
    if (target.classList.contains('fa-caret-down')) {
      target.classList.replace('fa-caret-down', 'fa-caret-right');
      children && children.classList.toggle('visible');
      return;
    }
  }

  setEvent() {
    this.addEventToTarget('click', '.page', e => {
      const { onClickDelete, onClickCreate } = this.state;
      const { className } = e.target;
      const pageItem = e.target.closest('.page');
      const pageId = pageItem.dataset.id;
      const children = pageItem.querySelector('.page_list');

      this.changeToggleIcon(e.target, children);

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
