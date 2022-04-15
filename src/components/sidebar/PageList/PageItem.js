import Component from '../../base/Component.js';
import { addClass, addDataset } from '../../../utils/createElement.js';

class PageItem extends Component {
  setup() {
    this.createNode('li');
    addClass(this.$node, ['page']);
    addDataset(this.$node, { id: this.props.id });
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
}

export default PageItem;
