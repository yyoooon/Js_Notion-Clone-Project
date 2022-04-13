import Component from '../components/base/Component.js';
import PageList from '../components/sidebar/PageList/PageList.js';

class Sidebar extends Component {
  PageList;

  template() {
    return `
    <div data-component="PageList"></div>
    `;
  }

  mounted() {
    const $pageList = this.$target.querySelector('[data-component="PageList"]');
    this.PageList = new PageList($pageList);
  }
}

export default Sidebar;

// Header 렌더링
// 서버에서 id에 맞는 페이지 목록 데이터 불러와서 PageList에 전달해주고 렌더링
// AddButton렌더링
