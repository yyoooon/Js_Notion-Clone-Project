import Component from '../../base/Component.js';
import PageItem from './PageItem.js';
import { getDocumentList } from '../../../api/apis.js';
import { createElement, addClassName } from '../../../utils/createElement.js';

class PageList extends Component {
  setup() {
    this.state = {
      data: [],
    };
  }

  template() {
    return `
      <ul id="root" class="page_list"></ul>
    `;
  }

  createChildrenPages(childrenData, parentEl) {
    const childItemContainer = createElement('ul');
    addClassName(childItemContainer, ['page_list', 'visible']);

    parentEl.$node.appendChild(childItemContainer);
    this.createPageItems(childrenData, childItemContainer);
  }

  createPageItems(data, itemContainer) {
    itemContainer.innerHTML = '';

    data.length &&
      data.map(({ title, documents }) => {
        const pageItem = new PageItem(itemContainer, { title });
        const haveChildren = documents.length;
        haveChildren && this.createChildrenPages(documents, pageItem);
      });
  }

  mounted() {
    const { data } = this.state;
    const $pageList = document.getElementById('root');
    this.createPageItems(data, $pageList);
  }

  async fetch() {
    const data = await getDocumentList();
    this.setState({ data });
  }
}

export default PageList;
