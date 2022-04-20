import Component from '../components/base/Component.js';
import PageList from '../components/sidebar/PageList/PageList.js';
import AddButton from '../components/sidebar/AddButton/AddButton.js';
import {
  getDocumentList,
  createDocument,
  deleteDocument,
} from '/Users/yang-yun/Desktop/front-end/Js_NotionClone_Project/src/api/apis.js';
import { push } from '../routes/router.js';

class Sidebar extends Component {
  setup() {
    this.state = {
      pageListData: [],
    };
  }

  template() {
    return `
    <div class="sidebar_contents_wrap">
      <div data-component="PageList" class="pages_outliner"></div>
      <div data-component="AddButton"></div>
    </div>
    `;
  }

  async handleClickDelete(id) {
    await deleteDocument(id);
    push('/');
    this.fetch();
  }

  async handleClickCreate({ title, parentId }) {
    const { id } = await createDocument({ title, parentId });
    push(`/pages/${id}`);
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
