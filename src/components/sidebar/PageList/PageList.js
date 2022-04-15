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
    addClass(childItemContainer, ['page_list', 'visible']);

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

  setEvent() {
    this.addEventToTarget('click', '.page', e => {
      const { onClickRemove, onClickAdd } = this.state;
      const { className } = e.target;
      const id = e.target.closest('.page').dataset.id;

      switch (className) {
        case 'page_name':
          push(`/pages/${id}`);
          break;
        case 'page_toggleButton':
          console.log('toggle');
          break;
        case 'page_removeButton':
          onClickRemove(id);
          break;
        case 'page_add_pageButton':
          console.log('add');
          onClickAdd({ title: '제목 없음', parentId: id });
          break;
        default:
      }
    });
  }
}

export default PageList;
