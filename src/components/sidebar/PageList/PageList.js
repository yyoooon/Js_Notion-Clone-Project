import Component from '../../base/Component.js';
import PageItem from './PageItem.js';
import { getDocumentList } from '../../../api/apis.js';

class PageList extends Component {
  template() {
    return `
      <ul id="root" class="page_list">page_list야</ul>
    `;
  }

  createTreeView() {
    return;
  }

  mounted() {
    const $pageList = this.$target.querySelector('.page_list');
    new PageItem($pageList);
  }

  fetch() {
    console.log(getDocumentList());
  }
}

export default PageList;
