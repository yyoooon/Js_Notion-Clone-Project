export default class Component {
  $target;
  props;
  state;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
    this.fetch();
  }

  setup() {
    return;
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
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  reRender() {
    return;
  }

  setState(newState, reRender = false) {
    this.state = { ...this.state, ...newState };
    reRender ? this.reRender() : this.render();
  }
}
