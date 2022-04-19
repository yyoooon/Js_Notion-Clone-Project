import Component from '../components/base/Component.js';
import PageList from '../components/sidebar/PageList/PageList.js';
import AddButton from '../components/sidebar/AddButton/AddButton.js';
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
    <div data-component="AddButton"></div>
    `;
  }

  async handleClickDelete(id) {
    await deleteDocument(id);
    this.fetch();
  }

  async handleClickCreate({ title, parentId }) {
    await createDocument({ title, parentId });
    this.fetch();
  }

  mounted() {
    const $pageList = this.$target.querySelector('[data-component="PageList"]');
    const $addButton = this.$target.querySelector(
      '[data-component="AddButton"]',
    );
    this.PageList = new PageList($pageList, {
      data: this.state.pageListData,
      onClickDelete: this.handleClickDelete.bind(this),
      onClickCreate: this.handleClickCreate.bind(this),
    });
    new AddButton($addButton, {
      onClick: this.handleClickCreate.bind(this),
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
