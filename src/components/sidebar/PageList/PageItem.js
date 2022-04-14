import Component from '../../base/Component.js';

class PageItem extends Component {
  setup() {
    this.createNode({ tagName: 'li', classArr: ['page'] });
  }
  template() {
    const { title } = this.props;
    return `
        <div class="page_focuable_elements">
        <button class="page_toggleButton" type="button">
          <i class="fas fa-caret-down"></i>
        </button>
        <h3 class="page_name">${title}</h3>
        <button class="page_removeButton" type="button">
            𝗫
        </button>
        <button class="page_add_pageButton" type="button">
            ➕
        </button>
        </div>
    `;
  }

  setEvent() {
    return;
  }
}

export default PageItem;
