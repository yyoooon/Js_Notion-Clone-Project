import Component from '../components/base/Component.js';
import PageList from '../components/sidebar/PageList/PageList.js';
import {
  getDocumentList,
  createDocument,
  deleteDocument,
} from '/Users/yang-yun/Desktop/front-end/Js_NotionClone_Project/src/api/apis.js';

class Sidebar extends Component {
  setup() {
    this.state = {
      pageListData: [],
    };
  }

  template() {
    return `
    <div data-component="PageList"></div>
    `;
  }

  async handleClickRemoveIcon(id) {
    await deleteDocument(id);
    this.fetch();
    return;
  }

  mounted() {
    const $pageList = this.$target.querySelector('[data-component="PageList"]');
    this.PageList = new PageList($pageList, {
      data: this.state.pageListData,
      onClickRemove: this.handleClickRemoveIcon.bind(this),
    });
  }

  async fetch() {
    const pageListData = await getDocumentList();
    this.setState({ pageListData }, true);
  }

  reRender() {
    this.PageList.setState({
      data: this.state.pageListData,
    });
  }
}

export default Sidebar;
