import { createElement } from '../../utils/createElement.js';

export default class Component {
  $node;
  $target;
  props;
  state;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
    this.fetch();
  }

  setup() {
    return;
  }

  createNode(tagName) {
    this.$node = createElement(tagName);
  }

  fetch() {
    return;
  }

  template() {
    return '';
  }

  mounted() {
    return;
  }

  addEventToTarget(eventType, selector, callback) {
    const children = [...Array.from(this.$target.querySelectorAll(selector))];

    const isTarget = target => {
      if (target instanceof HTMLElement) {
        return children.includes(target) || target.closest(selector);
      }
    };

    this.$target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }

  setEvent() {
    return;
  }

  render() {
    if (this.$node) {
      this.$node.innerHTML = this.template();
      this.$target.appendChild(this.$node);
    } else {
      this.$target.innerHTML = this.template();
    }
    this.mounted();
    this.setEvent();
  }

  reRender() {
    return;
  }

  setState(newState, reRender = false) {
    this.state = { ...this.state, ...newState };
    reRender ? this.reRender() : this.render();
  }
}
